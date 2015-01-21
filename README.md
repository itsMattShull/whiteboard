# whiteboard
A project management tool designed to keep people on task through multiple projects.  This tool was created to help productivity within the office and free up a few whiteboards.  You can add multiple projects, add people to projects, create tasks in a project, and assign people to specific tasks.  Within each task you can set a description of the task.  The title of the task, person it's assigned to, and the task description are all editable by click on the task.  

###Demo
A full featured demo can be found at [mattshull.com/wbdemo](http://www.mattshull.com/wbdemo).

###Setup
Just download the files, drop them in a folder, create a database and tables using databases.sql, and change process/connect.php to include the correct database credentials.

###Usage
There are 4 main sections in whiteboard: Stories, Working, Testing, and Done.  

Stories includes 2 sections: Planning and Ready.  Tasks that are still being talked through and planned will go under Planning.  Tasks that are ready to be worked will go under Ready, letting the person it's assigned to know that they can begin work on that task.

Working includes 2 sections: In Progress and Done.  In Progress tasks are the tasks that are currently being worked on by the user.  Tasks under Done are tasks that have been completed and are waiting for the assigned user to test them.

Testing includes 2 sections: In Progress and Done.  In Progress tasks are the tasks that are currently being tested by the user.  Tasks under Done are tasks that have been tested and are waiting for final inspection.

Done includes the tasks that have been completed and tested.
