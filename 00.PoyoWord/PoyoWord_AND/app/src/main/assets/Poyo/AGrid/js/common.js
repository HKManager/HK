$(document).ready(function(){
	createGrid();
	
	if(document.URL.match('grouping')!=null){
		console.log(123);
		defineGroupColumns(datagrid);

		$('#showExpanded').on('click', {target : datagrid}, function(event){
			var objGrid = event.data.target;
			objGrid.setAllGroupNodesOpened(true);
		});

		$('#showCollapsed').on('click', {target : datagrid}, function(event){
			var objGrid = event.data.target;
			objGrid.setAllGroupNodesOpened(false);
		});

		$('#showSum').on('click', {target : datagrid}, function(event){
			var objGrid = event.data.target;

			//합계표시
			if(strCalculateType != 'sum'){
				strCalculateType = 'sum';
				getCalculateType = function(){return 'sum'};
				initGroup(objGrid);
			}

			objGrid = null;
		});

		$('#showAvg').on('click', {target : datagrid}, function(event){
			var objGrid = event.data.target;

			//평균표시
			if(strCalculateType != 'average'){
				strCalculateType = 'average';
				getCalculateType = function(){return 'average'};
				initGroup(objGrid);
			}

			objGrid = null;
		});
	}
});