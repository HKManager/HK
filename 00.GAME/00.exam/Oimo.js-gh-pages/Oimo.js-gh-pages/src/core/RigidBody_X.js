import { BODY_NULL, BODY_DYNAMIC, BODY_STATIC } from '../constants';
import { printError } from './Utils';

import { MassInfo } from '../shape/MassInfo';

import { _Math } from '../math/Math';
import { Mat33 } from '../math/Mat33';
import { Quat } from '../math/Quat';
import { Vec3 } from '../math/Vec3';

import { Contact } from '../constraint/contact/Contact_X';


/**
* The class of rigid body.
* Rigid body has the shape of a single or multiple collision processing,
* I can set the parameters individually.
* @author saharan
*/

function RigidBody ( Position, Rotation ) {

    this.position = Position || new Vec3();
    this.orientation = Rotation || new Quat();

    this.scale = 1;
    this.invScale = 1;

    // possible link to three Mesh;
    this.mesh = null;

    this.id = NaN;
    this.name = '';

    // The maximum number of shapes that can be added to a one rigid.
    //this.MAX_SHAPES = 64;//64;

    //this.prev = null;
    //this.next = null;

    // I represent the kind of rigid body.
    // Please do not change from the outside this variable.
    // If you want to change the type of rigid body, always
    // Please specify the type you want to set the arguments of setupMass method.
    this.type = BODY_NULL;

    this.massInfo = new MassInfo();


    this.newPosition = new Vec3();
    this.newOrientation = new Quat();
    this.controlPos = false;
    this.controlRot = false;

    this.tmpPos = new Vec3();
    this.tmpQuat = new Quat();


    this.quaternion = new Quat();
    this.pos = new Vec3();



    // Is the translational velocity.
    this.linearVelocity = new Vec3();
    // Is the angular velocity.
    this.angularVelocity = new Vec3();

    //--------------------------------------------
    //  Please do not change from the outside this variables.
    //--------------------------------------------

    // It is a world that rigid body has been added.
    this.parent = null;

    // An array of contact that are included in the rigid body.
    this.contactLink = [];

    // An array of shapes that are included in the rigid body.
    this.shapes = [];

    // It is the link array of joint that is connected to the rigid body.
    this.jointLink = [];

    // It is the world coordinate of the center of gravity in the sleep just before.
    this.sleepPosition = new Vec3();
    // It is a quaternion that represents the attitude of sleep just before.
    this.sleepOrientation = new Quat();
    // I will show this rigid body to determine whether it is a rigid body static.
    this.isStatic = false;
    // I indicates that this rigid body to determine whether it is a rigid body dynamic.
    this.isDynamic = false;

    this.isKinematic = false;
    // It is a rotation matrix representing the orientation.
    this.rotation = new Mat33();

    //--------------------------------------------
    // It will be recalculated automatically from the shape, which is included.
    //--------------------------------------------

    // This is the weight.
    this.mass = 0;
    // It is the reciprocal of the mass.
    this.inverseMass = 0;

    // It is the inverse of the inertia tensor in the world system.
    this.inverseInertia = new Mat33();
    // It is the inertia tensor in the initial state.
    this.localInertia = new Mat33();
    // It is the inverse of the inertia tensor in the initial state.
    this.inverseLocalInertia = new Mat33();

    this.tmpInertia = new Mat33();


    // I indicates rigid body whether it has been added to the simulation Island.
    this.addedToIsland = false;
    // It shows how to sleep rigid body.
    this.allowSleep = true;
    // This is the time from when the rigid body at rest.
    this.sleepTime = 0;
    // I shows rigid body to determine whether it is a sleep state.
    this.sleeping = false;

}

Object.assign( RigidBody.prototype, {

    RigidBody: true,

    setId: function ( n ) { 

        this.id = i; 

    },

    setParent: function ( world ) {

        this.parent = world;
        this.scale = this.parent.scale;
        this.invScale = this.parent.invScale;
        this.id = this.parent.numRigidBodies;
        if( !this.name ) this.name = this.id;

        this.updateMesh();

    },

    /**
    * I'll add a shape to rigid body.
    * If you add a shape, please call the setupMass method to step up to the start of the next.
    * @param   shape shape to Add
    */
    addShape:function( shape ){

        if(shape.parent) printError("RigidBody", "It is not possible that you add to the multi-rigid body the shape of one");

        //if(this.shapes!=null)( this.shapes.prev = shape ).next = this.shapes;
        //this.shapes = shape;

        shape.parent = this;
        shape.contactLink = [];
        if( this.parent ) this.parent.addShape( shape );

        this.shapes.push( shape );

    },
    /**
    * I will delete the shape from the rigid body.
    * If you delete a shape, please call the setupMass method to step up to the start of the next.
    * @param   shape shape to Delete
    */
    removeShape:function( shape ){

        this.shapes.splice( this.shapes.indexOf( shape ), 1 );

        //var remove = shape;
        if(shape.parent !== this) return;
        //var prev=remove.prev;
        //var next=remove.next;
        //if(prev!=null) prev.next=next;
        //if(next!=null) next.prev=prev;
        //if(this.shapes==remove)this.shapes=next;
        //remove.prev=null;
        //remove.next=null;
        shape.parent = null;
        if( this.parent ) this.parent.removeShape( shape );
        //this.numShapes--;

    },

    remove: function () {

        this.dispose();

    },

    dispose: function () {

        if( this.mesh ) this.mesh = null;
        this.parent.removeRigidBody( this );

    },

    checkContact: function( name ) {

        this.parent.checkContact( this.name, name );

    },

    /**
    * Calulates mass datas(center of gravity, mass, moment inertia, etc...).
    * If the parameter type is set to BODY_STATIC, the rigid body will be fixed to the space.
    * If the parameter adjustPosition is set to true, the shapes' relative positions and
    * the rigid body's position will be adjusted to the center of gravity.
    * @param   type
    * @param   adjustPosition
    */

    setupMass: function ( type, AdjustPosition ) {

        var adjustPosition = ( AdjustPosition !== undefined ) ? AdjustPosition : true;

        this.type = type || BODY_DYNAMIC;
        this.isDynamic = this.type === BODY_DYNAMIC;
        this.isStatic = this.type === BODY_STATIC;

        this.mass = 0;
        this.localInertia.set(0,0,0,0,0,0,0,0,0);


        var tmpM = new Mat33();
        var tmpV = new Vec3();

        var i = this.shapes.length, shape;

        while(i--){

            shape = this.shapes[i];
            shape.calculateMassInfo( this.massInfo );
            var shapeMass = this.massInfo.mass;
            tmpV.addScaledVector( shape.relativePosition, shapeMass );
            this.mass += shapeMass;
            this.rotateInertia( shape.relativeRotation, this.massInfo.inertia, tmpM );
            this.localInertia.add( tmpM );

            // add offset inertia
            this.localInertia.addOffset( shapeMass, shape.relativePosition );

        }

        this.inverseMass = 1 / this.mass;
        tmpV.scaleEqual( this.inverseMass );

        if( adjustPosition ){
            this.position.add( tmpV );
            i = this.shapes.length;
            while(i--){
                this.shapes[i].relativePosition.subEqual( tmpV );
            }

            // subtract offset inertia
            this.localInertia.subOffset( this.mass, tmpV );

        }

        this.inverseLocalInertia.invert( this.localInertia );

        //}

        if( this.type === BODY_STATIC ){
            this.inverseMass = 0;
            this.inverseLocalInertia.set(0,0,0,0,0,0,0,0,0);
        }

        this.syncShapes();
        this.awake();

    },
    /**
    * Awake the rigid body.
    */
    awake:function(){

        if( !this.allowSleep || !this.sleeping ) return;
        this.sleeping = false;
        this.sleepTime = 0;

        var i, js, cs;

        // awake connected constraints
        i = this.contactLink.length;
        while(i--){
            cs = this.contactLink[i];
            cs.body.sleepTime = 0;
            cs.body.sleeping = false;
        }

        i = this.jointLink.length;
        while(i--){
            js = this.jointLink[i];
            js.body.sleepTime = 0;
            js.body.sleeping = false;
        }

        i = this.shapes.length;
        while(i--){
            this.shapes[i].updateProxy();
        }

    },
    /**
    * Sleep the rigid body.
    */
    sleep:function(){

        if( !this.allowSleep || this.sleeping ) return;

        this.linearVelocity.set(0,0,0);
        this.angularVelocity.set(0,0,0);
        this.sleepPosition.copy( this.position );
        this.sleepOrientation.copy( this.orientation );

        this.sleepTime = 0;
        this.sleeping = true;

        var i = this.shapes.length;
        while(i--){
            this.shapes[i].updateProxy();
        }
    },

    testWakeUp: function(){

        if( this.linearVelocity.testZero() || this.angularVelocity.testZero() || this.position.testDiff( this.sleepPosition ) || this.orientation.testDiff( this.sleepOrientation )) this.awake(); // awake the body

    },

    /**
    * Get whether the rigid body has not any connection with others.
    * @return {void}
    */
    isLonely: function () {
        return this.jointLink.length === 0 && this.contactLink.length === 0;
        //return this.numJoints==0 && this.numContacts==0;
    },

    /**
    * The time integration of the motion of a rigid body, you can update the information such as the shape.
    * This method is invoked automatically when calling the step of the World,
    * There is no need to call from outside usually.
    * @param  timeStep time
    * @return {void}
    */

    updatePosition: function ( timeStep ) {

        switch( this.type ){

            case BODY_STATIC:

                this.linearVelocity.set(0,0,0);
                this.angularVelocity.set(0,0,0);

                // ONLY FOR TEST
               if( this.controlPos ){
                    this.tmpPos.sub( this.newPosition, this.position );
                    this.linearVelocity.scale( this.tmpPos, (1/timeStep) );
                    //this.position.copy( this.newPosition );
                    //this.tmpPos.sub( this.newPosition, this.position );
                    //this.linearVelocity.scale(this.tmpPos, 1/timeStep)
                    
                    this.controlPos = false;
                    this.position.addScaledVector( this.linearVelocity, timeStep );
                }
                if( this.controlRot ){

                    this.angularVelocity.copy( this.getAxis() );
                    this.orientation.copy( this.newOrientation );
                    this.controlRot = false;

                    this.orientation.addTime( this.angularVelocity, timeStep );

                }

            break;
            case BODY_DYNAMIC:

                if( this.isKinematic ){

                    this.linearVelocity.set(0,0,0);
                    this.angularVelocity.set(0,0,0);

                }

                if( this.controlPos ){

                    this.linearVelocity.subVectors( this.newPosition, this.position ).multiplyScalar(1/timeStep);
                    this.controlPos = false;

                }
                if( this.controlRot ){

                    this.angularVelocity.copy( this.getAxis() );
                    this.orientation.copy( this.newOrientation );
                    this.controlRot = false;

                }

                this.position.addScaledVector( this.linearVelocity, timeStep );
                this.orientation.addTime( this.angularVelocity, timeStep );

                this.updateMesh();

            break;
            default: printError("RigidBody", "Invalid type.");

        }


        this.syncShapes();
        //this.updateMesh();

    },

    getAxis: function () {

        return new Vec3( 0,1,0 ).applyMatrix3( this.inverseLocalInertia, true ).normalize();

    },

    rotateInertia: function ( rot, inertia, out ) {

        this.tmpInertia.multiplyMatrices( rot, inertia );
        out.multiplyMatrices( this.tmpInertia, rot, true );

    },

    syncShapes: function () {

        this.rotation.setQuat( this.orientation );
        this.rotateInertia( this.rotation, this.inverseLocalInertia, this.inverseInertia );

        var i = this.shapes.length, shape;

        while(i--){

            shape = this.shapes[i];
            shape.position.copy( shape.relativePosition ).applyMatrix3( this.rotation, true ).add( this.position );
            // add by QuaziKb
            shape.rotation.multiplyMatrices( this.rotation, shape.relativeRotation );
            shape.updateProxy();

        }
    },

    //---------------------------------------------
    // APPLY IMPULSE FORCE
    //---------------------------------------------

    applyImpulse: function ( position, force ) {

        this.linearVelocity.addScaledVector( force, this.inverseMass );
        var rel = new Vec3().copy( position ).sub( this.position ).cross( force ).applyMatrix3( this.inverseInertia, true );
        this.angularVelocity.add( rel );

    },

    //---------------------------------------------
    // SET DYNAMIQUE POSITION AND ROTATION
    //---------------------------------------------

    setPosition: function ( pos ) {

        this.newPosition.copy( pos ).multiplyScalar( this.invScale );
        this.controlPos = true;
        if( !this.isKinematic ) this.isKinematic = true;

    },

    setQuaternion: function ( q ) {
        //if(this.type == this.BODY_STATIC)this.orientation.init(q.w,q.x,q.y,q.z);

        this.newOrientation.copy( q );
        this.controlRot = true;
        if( !this.isKinematic ) this.isKinematic = true;

    },

    setRotation: function ( rot ) {

        this.newOrientation = new Quat().setFromEuler( rot.x * _Math.degtorad, rot.y * _Math.degtorad, rot.z * _Math.degtorad );//this.rotationVectToQuad( rot );
        this.controlRot = true;

    },

    //---------------------------------------------
    // RESET DYNAMIQUE POSITION AND ROTATION
    //---------------------------------------------

    resetPosition:function(x,y,z){

        this.linearVelocity.set( 0, 0, 0 );
        this.angularVelocity.set( 0, 0, 0 );
        this.position.set( x, y, z ).multiplyScalar( this.invScale );
        //this.position.set( x*OIMO.WorldScale.invScale, y*OIMO.WorldScale.invScale, z*OIMO.WorldScale.invScale );
        this.awake();
    },

    resetQuaternion:function( q ){

        this.angularVelocity.set(0,0,0);
        this.orientation = new Quat( q.x, q.y, q.z, q.w );
        this.awake();

    },

    resetRotation:function(x,y,z){

        this.angularVelocity.set(0,0,0);
        this.orientation = new Quat().setFromEuler( x * _Math.degtorad, y * _Math.degtorad,  z * _Math.degtorad );//this.rotationVectToQuad( new Vec3(x,y,z) );
        this.awake();

    },

    //---------------------------------------------
    // GET POSITION AND ROTATION
    //---------------------------------------------

    getPosition:function () {

        return this.pos;

    },

    getQuaternion: function () {

        return this.quaternion;

    },

    //---------------------------------------------
    // AUTO UPDATE THREE MESH
    //---------------------------------------------

    connectMesh: function ( mesh ) {

        this.mesh = mesh;
        //this.mesh.matrixAutoUpdate = false;
        this.updateMesh();

    },

    updateMesh: function () {

        this.pos.scale( this.position, this.scale );
        this.quaternion.copy( this.orientation );

        if( this.mesh === null ) return;

        this.mesh.position.copy( this.pos );
        this.mesh.quaternion.copy( this.quaternion );

        /*var s = this.mesh.scale;
        this.mesh.matrix.compose( this.pos, this.quaternion, s );
        this.mesh.matrixWorldNeedsUpdate = true;*/

    },

});

export { RigidBody };