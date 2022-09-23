const editButtonHandler = async (event) => {
  event.preventDefault();

  const postText = document.getElementsByClassName('post-text');
  let btnText = document.getElementsByClassName('edit-btn');
  var $textInput = $('<textarea class="form-control new-text"></textarea>');
  var $form = $('<div class="form-group new-text-container"></div>');
  //   const $btnContainer = document.getElementsByClassName('btn-container');
  const saveBtn = document.getElementById('save-btn');

  //   $($saveBtn).appendTo($btnContainer);
  $(postText).before($form);
  $(postText).remove().appendTo($form).hide();
  $(saveBtn).show();
  $(btnText).hide();

  // Add some styles:
  $textInput.css({
    display: 'block',
    width: '100%',
    height: '100%',
    font: $(postText).css('font'),
    color: 'black',
  });
  $textInput.css('background-color', 'transparent');
  $textInput.css('border', 'none');
  $textInput.css('max-width', '100%');

  // Build up the form:
  $form.append($textInput);
  $textInput.val($(postText).text()).focus();
};

const saveButtonHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-id');

  const saveBtn = document.getElementById('save-btn');
  const editBtn = document.getElementsByClassName('edit-btn');
  const newTextEl = document.getElementsByClassName('new-text');
  const newTextContainer =
    document.getElementsByClassName('new-text-container');
  const postText = document.getElementsByClassName('post-text');
  const postTextContainer = document.getElementsByClassName(
    'post-text-container'
  );
  $(saveBtn).hide();
  $(editBtn).show();

  const post_text = $(newTextEl).val().toString();
  //   console.log('newtext', newText);

  $(postText).appendTo(postTextContainer);

  $(postText).show();
  postText.textContent = 'dom test';

  $(newTextContainer).remove();

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ post_text }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace(`/api/post/${id}`);
  } else {
    alert('Failed to create post');
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // console.log('id', id);
    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      //   document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  } else {
    console.log('No data-id');
  }
};

document.querySelector('.del-btn').addEventListener('click', delButtonHandler);

document
  .querySelector('.edit-btn')
  .addEventListener('click', editButtonHandler);

document
  .querySelector('.save-btn')
  .addEventListener('click', saveButtonHandler);
