$(function() {
  
  function formatDummyText( text ) {
    if ( !text ) {
      return '&nbsp;';
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

  // $textarea.change(renderCanvas);

  function renderCanvas(){
    // $('#canvas-container').empty();

    // html2canvas(document.querySelector("#album-cover")).then(function(canvas) {
    //   $('#canvas-container').append(canvas);
    //   $textarea.focus();
    // });

  }

  // should debounce this
  $( window ).on( 'resize', positionTextarea );

  $('.save-img').click(function(){
    // $('#album-cover canvas').remove();

    html2canvas(document.querySelector("#album-cover")).then(function(canvas) {
      // $('#album-cover').append(canvas);
      canvas.toBlob(function(blob) {
        saveAs(blob, "My-YE-cover.png"); 
      });
    });
  })

  $textarea.focus();

});
