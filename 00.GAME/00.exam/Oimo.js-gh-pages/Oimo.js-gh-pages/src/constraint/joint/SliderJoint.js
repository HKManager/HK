import { JOINT_SLIDER } from '../../constants';
import { Joint } from './Joint';
import { LimitMotor } from './LimitMotor';
import { Vec3 } from '../../math/Vec3';
import { Quat } from '../../math/Quat';
import { Mat33 } from '../../math/Mat33';
import { _Math } from '../../math/Math';

import { Rotational3Constraint } from './base/Rotational3Constraint';
import { Translational3Constraint } from './base/Translational3Constraint';


/**
 * A slider joint allows for relative translation and relative rotation between two rigid bodies along the axis.
 *
 * @author saharan
 * @author lo-th
 */

function SliderJoint( config, lowerTranslation, upperTranslation ){

    Joint.call( this, config );

    this.type = JOINT_SLIDER;

    // The axis in the first body's coordinate system.
    this.localAxis1 = config.localAxis1.clone().normalize();
    // The axis in the second body's coordinate system.
    this.localAxis2 = config.localAxis2.clone().normalize();

    // make angle axis
    var arc = new Mat33().setQuat( new Quat().setFromUnitVectors( this.localAxis1, this.localAxis2 ) );
    this.localAngle1 = new Vec3().tangent( this.localAxis1 ).normalize();
    this.localAngle2 = this.localAngle1.clone().applyMatrix3( arc, true );

    this.ax1 = new Vec3();
    this.ax2 = new Vec3();
    this.an1 = new Vec3();
    this.an2 = new Vec3();

    this.tmp = new Vec3();
    
    this.nor = new Vec3();
    this.tan = new Vec3();
    this.bin = new Vec3();

    // The limit and motor for the rotation
    this.rotationalLimitMotor = new LimitMotor( this.nor, false );
    this.r3 = new Rotational3Constraint( this, this.rotationalLimitMotor, new LimitMotor( this.tan, true ), new LimitMotor( this.bin, true ) );

    // The limit and motor for the translation.
    this.translationalLimitMotor = new LimitMotor( this.nor, true );
    this.translationalLimitMotor.lowerLimit = lowerTranslation;
    this.translationalLimitMotor.upperLimit = upperTranslation;
    this.t3 = new Translational3Constraint( this, this.translationalLimitMotor, new LimitMotor( this.tan, true ), new LimitMotor( this.bin, true ) );

};

SliderJoint.prototype = Object.assign( Object.create( Joint.prototype ), {

    constructor: SliderJoint,

    preSolve: function ( timeStep, invTimeStep ) {

        this.updateAnchorPoints();

        this.ax1.copy( this.localAxis1 ).applyMatrix3( this.body1.rotation, true );
        this.an1.copy( this.localAngle1 ).applyMatrix3( this.body1.rotation, true );

        this.ax2.copy( this.localAxis2 ).applyMatrix3( this.body2.rotation, true );
        this.an2.copy( this.localAngle2 ).applyMatrix3( this.body2.rotation, true );

        // normal tangent binormal

        this.nor.set(
            this.ax1.x*this.body2.inverseMass + this.ax2.x*this.body1.inverseMass,
            this.ax1.y*this.body2.inverseMass + this.ax2.y*this.body1.inverseMass,
            this.ax1.z*this.body2.inverseMass + this.ax2.z*this.body1.inverseMass
        ).normalize();
        this.tan.tangent( this.nor ).normalize();
        this.bin.crossVectors( this.nor, this.tan );

        // calculate hinge angle

        this.tmp.crossVectors( this.an1, this.an2 );

        var limite = _Math.acosClamp( _Math.dotVectors( this.an1, this.an2 ) );

        if( _Math.dotVectors( this.nor, this.tmp ) < 0 ) this.rotationalLimitMotor.angle = -limite;
        else this.rotationalLimitMotor.angle = limite;

        // angular error

        this.tmp.crossVectors( this.ax1, this.ax2 );
        this.r3.limitMotor2.angle = _Math.dotVectors( this.tan, this.tmp );
        this.r3.limitMotor3.angle = _Math.dotVectors( this.bin, this.tmp );

        // preSolve
        
        this.r3.preSolve( timeStep, invTimeStep );
        this.t3.preSolve( timeStep, invTimeStep );

    },

    solve: function () {

        this.r3.solve();
        this.t3.solve();

    },

    postSolve: function () {

    }

});

export { SliderJoint };