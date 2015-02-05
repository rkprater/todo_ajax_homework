$(document).ready(function () {
  todo.init();

});


var todo = {

  init: function () {
    todo.initStyling();
    todo.initEvents();

  },
  initStyling: function () {
    todo.renderTodo();
  },
  initEvents: function () {

    $('section').on('click', '.showEditTodo', function (event) {
      event.preventDefault();
      $(this).closest('article').find('.editTodo').toggleClass('show');
    });

    $('section').on('submit', '.editTodo', function (event) {
      event.preventDefault();
      var todoId = $(this).closest('article').data('todoid');
      var editedTodo = {
        title: $(this).find('input[name="editTitle"]').val(),
        date:  $(this).find('input[name="newDate"]').val(),
        content: $(this).find('textarea[name="newContent"]').val()
      };

      todo.updateTodo(todoId, editedTodo);


    });

    $('#createTodo').on('submit', function (event) {
      event.preventDefault();
        var newTodo = {
          title: $(this).find('input[name="editTitle"]').val(),
          date: $(this).find('input[name="newDate"]').val(),
          content: $(this).find('textarea[name="newContent"]').val()
        };

        todo.createTodo(newTodo);
    });

    $('section').on('click', '.deleteTodo', function (event) {
      event.preventDefault();
       var todoId = $(this).closest('article').data('todoid');
       console.log(todoId);
       todo.deleteTodo(todoId);
    });

  },
  config: {
    url: 'http://tiy-fee-rest.herokuapp.com/collections/awesomeOne',

  },
  render: function (data, tmpl, $el) {
    var template = _.template(data, tmpl);

    $el.append(template);
  },
  renderTodo: function () {
    $.ajax({
      url: todo.config.url,
      type: 'GET',
      success: function (todo) {
      //  console.log(todo);
        var template = _.template($('#todoTmpl').html());
        var markup = "";
        todo.forEach(function (item, idx, arr) {
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
  createTodo: function (book) {

    $.ajax({
      url: todo.config.url,
      data: todo,
      type: 'POST',
      success: function (data) {
        console.log(data);
        todo.renderTodo();
      },
      error: function (err) {
        console.log(err);
      }
    });

  },
  deleteTodo: function (id) {

    $.ajax({
      url: todo.config.url + '/' + id,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        books.renderTodo();
      },
      error: function (err) {
        console.log(err);
      }
    });



  },
  updateTodo: function (id, todo) {

    $.ajax({
      url: todo.config.url + '/' + id,
      data: todo,
      type: 'PUT',
      success: function (data) {
        console.log(data);
        todo.renderTodo();
      },
      error: function (err) {
        console.log(err);
      }
    });


  },

};
