$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="chat--main__message--list__message">
          <div class="chat--main__message--list__message--coments">
            <div class="chat--main__message--list__message--coments__name">
              ${message.user_name}
            </div>
            <div class="chat--main__message--list__message--coments__time">
              ${message.created_at}
            </div>
          </div>
          <div class="chat--main__message--list__message__content">
            <p class="chat--main__message--list__message__content__message">
              ${message.content}
            </p>
            <img class="chat--main__message--list__message__content__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="chat--main__message--list__message">
        <div class="chat--main__message--list__message--coments">
          <div class="chat--main__message--list__message--coments__name">
            ${message.user_name}
          </div>
          <div class="chat--main__message--list__message--coments__time">
            ${message.created_at}
          </div>
        </div>
        <div class="chat--main__message--list__message__content">
          <p class="chat--main__message--list__message__content__message">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.chat--main__message--form__contents').on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat--main__message--list').append(html);
      $('.chat--main__message--list').animate({ scrollTop: $('.chat--main__message--list')[0].scrollHeight});
      $('form')[0].reset()
      $('.chat--main__message--form__contents__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});