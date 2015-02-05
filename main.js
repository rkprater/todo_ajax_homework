$(document).ready(function () {
  ToDo.init();

});


var ToDo = {

  init: function () {
    ToDo.initStyling();
    ToDo.initEvents();

  },
  initStyling: function () {
    ToDo.renderTask();
  },
  initEvents: function () {

    $('section').on('click', '.showEditTask', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editTask').toggleClass('show');
    });

    $('section').on('submit', '.editTask', function (event) {
      event.preventDefault();
      var ToDoId = $(this).closest('article').data('todoid');
      var editedToDo = {
        Task: $(this).find('input[name="editTask"]').val(),
        description: $(this).find('textarea[name="editDescription"]').val(),
        deadline: $(this).find('input[name="editDeadline"]').val()
      };

      ToDo.updateTask(ToDoId, editedToDo);


    });

    $('#createTask').on('submit', function (event) {
      event.preventDefault();
      var newTask = {
        Task: $(this).find('input[name="newTask"]').val(),
        description: $(this).find('textarea[name="newDescription"]').val(),
        deadline: $(this).find('input[name="newDeadline"]').val()
      };

      ToDo.createTask(newTask);
    });

    $('section').on('click', '.deleteTask', function (event) {
      event.preventDefault();
      var ToDoId = $(this).closest('article').data('todoid');
      console.log(ToDoId);
      ToDo.deleteTask(ToDoId);
    });

  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/rkprater',

  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.append(template);
  },
  renderTask: function () {
    $.ajax({
      url: ToDo.config.url,
      type: 'GET',
      success: function (ToDo) {
        console.log(ToDo);
        var template = _.template($('#ToDoTmpl').html());
        var markup = "";
        ToDo.forEach(function (item, idx, arr) {
          markup += template(item);
        });
        console.log('markup is.....', markup);
        $('section').html(markup);
      },
      error: function (err) {
        console.log(err);
      }
    });
  },
  createTask: function (task) {

    $.ajax({
      url: ToDo.config.url,
      data: task,
      type: 'POST',
      success: function (data) {
        console.log(data);
        ToDo.renderTask();
      },
      error: function (err) {
        console.log(err);
      }
    });

  },
  deleteTask: function (id) {

    $.ajax({
      url: ToDo.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        ToDo.renderTask();
      },
      error: function (err) {
        console.log(err);
      }
    });



  },
  updateTask: function (id, task) {

    $.ajax({
      url: ToDo.config.url + '/' + id,
      data: task,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        ToDo.renderTask();
      },
      error: function (err) {
        console.log(err);
      }
    });


  }

};
