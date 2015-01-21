//sortable plugin
$(function() {
    $( "#stories-ready, #stories-not-ready, #working-inprogress, #working-done, #testing-inprogress, #testing-done, #done" ).sortable({
      	connectWith: ".connectedSortable",
      	items: "li",
      	update: function (e, ui) {
            var itemOrder = $(ui.item).parent().children().index(ui.item);
            var list = $(ui.item).parent().attr("id");
            var taskID = $(ui.item).data("taskid");
            $(ui.item).attr("data-order", itemOrder);

            var nextItemOrder = $(ui.item).next().data("order");
            var prevItemOrder = $(ui.item).prev().data("order");

            if (nextItemOrder == prevItemOrder) {
            	$.post("process/updateItem.php", {taskID:taskID, list:list, itemOrder:itemOrder, subOrder:"1"}, function (data) {
				});
            }
            else {
            	$.post("process/updateItem.php", {taskID:taskID, list:list, itemOrder:itemOrder, subOrder:"0"}, function (data) {
				});
            }
	    }
    }).disableSelection();
});

//globals
var projectID = 0;
var taskID = 0;

//functions
function getProjects() {
	$("#all-projects").html("");
	$.ajax({
	  	url: "process/getProjects.php",
	  	dataType: "json",
	  	success: function(data) {
	  		$.each(data.projects, function (index, data) {
	  			$("#all-projects").append("<div class='project-button' data-projectid='"+data.id+"'><div class='project-button-name'>"+data.name+"</div><div class='project-button-producer'>"+data.producer+"</div></div>");
		    });
	  	}
	});
}

getProjects();

$("#all-projects").on("click", ".project-button", function() {
	projectID = $(this).data("projectid"); //set projectID

	$("#stories-not-ready > li, #stories-ready > li, #working-inprogress > li, #working-done > li, #done > li, #testing-inprogress > li, #testing-done > li").remove();

	$("#general-options").hide();
	$("#project-options").show();

	//hide the project selection and show the project
	$("#all-projects").hide();
	$("#project").show();

	$("#peopleList").html("");

	$.ajax({
	  	url: "process/getPeople.php?projectID="+projectID,
	  	dataType: "json",
	  	success: function(data) {
	  		$.each(data.people, function (index, data) {
	  			$("#peopleList").append("<li class='person btn' style='background:"+data.color+";'>"+data.name+"</li>");
		    });
	  	}
	});

	$.ajax({
	  	url: "process/getItems.php?projectID="+projectID,
	  	dataType: "json",
	  	success: function(data) {
	  		$.each(data.storiesNotReady, function (index, data) {
	  			$("#stories-not-ready").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
		    $.each(data.storiesReady, function (index, data) {
	  			$("#stories-ready").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
		    $.each(data.workingInProgress, function (index, data) {
	  			$("#working-inprogress").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
		    $.each(data.workingDone, function (index, data) {
	  			$("#working-done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
		    $.each(data.testingInProgress, function (index, data) {
	  			$("#testing-inprogress").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
		    $.each(data.testingDone, function (index, data) {
	  			$("#testing-done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
	  		$.each(data.done, function (index, data) {
	  			$("#done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		    });
	  	}
	});
});

$("#to-projects").on("click", function() {
	$("#general-options").show();
	$("#project-options").hide();

	//hide the project selection and show the project
	$("#all-projects").show();
	$("#project").hide();

	getProjects();
});

$("#submitNewProject").on("click", function() {
	projectName=$("#newProjectName").val();
	projectProducer=$("#newProjectProducer").val();

	$.post("process/newProject.php", {projectName:projectName, projectProducer:projectProducer}, function (data) {
		$("#newProjectName").val("");
		$("#newProjectProducer").val("");
		projectID = data; //set projectID
		console.log(data);

		$("#general-options").hide();
		$("#project-options").show();

		//hide the project selection and show the project
		$("#all-projects").hide();
		$("#project").show();

		$.ajax({
		  	url: "process/getItems.php?projectID="+projectID,
		  	dataType: "json",
		  	success: function(data) {
		  		$.each(data.storiesNotReady, function (index, data) {
		  			$("#stories-not-ready").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
			    $.each(data.storiesReady, function (index, data) {
		  			$("#stories-ready").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
			    $.each(data.workingInProgress, function (index, data) {
		  			$("#working-inprogress").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
			    $.each(data.workingDone, function (index, data) {
		  			$("#working-done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
			    $.each(data.testingInProgress, function (index, data) {
		  			$("#testing-inprogress").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
			    $.each(data.testingDone, function (index, data) {
		  			$("#testing-done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
		  		$.each(data.done, function (index, data) {
		  			$("#done").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
			    });
		  	}
		});
	});
});

$("#submitNewPerson").on("click", function() {
	personName=$("#newPersonName").val();
	personColor=$("#newPersonColor").val();

	$.post("process/newPerson.php", {personName:personName, personColor:personColor, projectID:projectID}, function (data) {
		$("#peopleList").append("<li class='person btn' style='background:"+personColor+"'>"+personName+"</li>");
		$("#newPersonName").val("");
	});
});

$("#addTask").on("click", function() {
	$("#newTaskUserID").html("");
	$.ajax({
	  	url: "process/getPeople.php?projectID="+projectID,
	  	dataType: "json",
	  	success: function(data) {
	  		$.each(data.people, function (index, data) {
	  			$("#newTaskUserID").append("<option value='"+data.id+"'>"+data.name+"</option>");
		    });
	  	}
	});
});

$("#submitNewTask").on("click", function() {
	taskTitle=$("#newTaskTitle").val();
	taskUserID=$("#newTaskUserID").val();
	taskDescription=$("#newTaskDescription").val();

	$.post("process/newTask.php", {taskTitle:taskTitle, taskUserID:taskUserID, taskDescription:taskDescription, projectID:projectID}, function (data) {
		data=JSON.parse(data);
		$("#stories-not-ready").append("<li class='ui-state-default getInfo' data-toggle='modal' data-target='#myModal' data-order='"+data.order+"' data-taskid='"+data.id+"' data-userid='"+data.userID+"' style='background:"+data.color+"'>"+data.title+"</li>");
		$("#newTaskTitle").val("");
		$("#newTaskDescription").val("");
	});
});

$("#project").on("click", ".getInfo", function() {
	taskID=$(this).data("taskid");
	$("#editTaskUserID").html("");
	$.ajax({
	  	url: "process/getItemInfo.php?itemID="+taskID,
	  	dataType: "json",
	  	success: function(data) {
	  		$("#editTaskTitle").val(data.title);
	  		$("#editTaskDescription").html(data.description);

	  		userID = data.userID;
	  		$.ajax({
			  	url: "process/getPeople.php?projectID="+projectID,
			  	dataType: "json",
			  	success: function(data) {
			  		$.each(data.people, function (index, data) {
			  			if (userID==data.id) {
			  				$("#editTaskUserID").append("<option selected value='"+data.id+"'>"+data.name+"</option>");
			  			}
			  			else {
			  				$("#editTaskUserID").append("<option value='"+data.id+"'>"+data.name+"</option>");
			  			}
				    });
			  	}
			});
	  	}
	});
});

$("#submitEditTask").on("click", function() {
	taskTitle=$("#editTaskTitle").val();
	taskUserID=$("#editTaskUserID").val();
	taskDescription=$("#editTaskDescription").val();
	$("*[data-taskid='"+taskID+"']").html(taskTitle);

	$.post("process/editTask.php", {taskTitle:taskTitle, taskUserID:taskUserID, taskDescription:taskDescription, taskID:taskID}, function (data) {
		$("*[data-taskid='"+taskID+"']").css("background-color", data);
	});
});