console.log('timothybauman.com');

$(function() {

  function formatDummyText( text ) {
    if ( !text ) {
      return 'write whatever <br>you feel like';
    }
    return text.replace( /\n$/, '<br>&nbsp;' )
      .replace( /\n/g, '<br>' );
  }

  var $wrap = $('#album-cover');
  var $textarea = $('textarea');
  var $dummy = $('.dummy');

  
  function positionTextarea() {
    var h = $wrap.height();
    var top = Math.max( 0, ( h - $dummy.height() ) * 0.5 );
    $textarea.css({
      paddingTop: top,
      height: h - top
    });
  }

  $textarea.on( 'keyup change', function( event ) {
    var html = formatDummyText( $textarea.val() );
    $dummy.html( html );
    positionTextarea();
  }).trigger('change');

  // should debounce this
  $( window ).on( 'resize', positionTextarea );

  $('.save-img').click(function(){
    window.scrollTo(0, 0);
    html2canvas(document.querySelector("#album-cover")).then(function(canvas) {
      
      canvas.toBlob(function(blob) {
        saveAs(blob, "My-YE-cover.png"); 
      });
    });
  })

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      
      reader.onload = function (e) {
        $('#bg').attr('src', e.target.result);
      }
      
      reader.readAsDataURL(input.files[0]);
      setTimeout(function() {
        positionTextarea();
      }, 100);
    }
  }
  
  $("#file").change(function(){
    readURL(this);
  });

});
