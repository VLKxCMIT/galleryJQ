$(document).ready(function() {
    // logo ^start
    $('#main_title').mouseover(function() {
        $('#main_title_smile').css({'width':'40px'});
    }).mouseout(function() {
        $('#main_title_smile').css({'width':'0'});
    });
    // logo ^end
    // load image ^start
    $('.linkForImg').click(function(e) {
        $('.linkForImg').css('opacity', 1);
        if ($(this).attr('href') != $('#currentImage').attr('src')) {
            $(this).css('opacity', 0.4);
            $('#currentImage').hide().attr('src', $(this).attr('href')).load(function() {
                $(this).fadeIn(1000);
            });
        }
        e.preventDefault();
    });
    // load image ^end
    var galleryCarousel = {};
    var position = $('.gLine').position().left - 16;
    galleryCarousel.gImagesCount = $('.linkForImg').length; // общее количество картинок в галерее
    galleryCarousel.gImagesWidth = galleryCarousel.gImagesCount * $('.linkForImg').outerWidth(true);
    galleryCarousel.fullVisibleImages = function() { // подсчет количества видимых gImages в окне блока $('.imagesLine')
        var imagesCount = Math.floor($('.gLine').width()/$('.linkForImg').outerWidth(true));
        return imagesCount;
    }
    var vidimo = galleryCarousel.fullVisibleImages() * $('.linkForImg').outerWidth(true);
    galleryCarousel.turn = function(where) {
        var ostatok = galleryCarousel.gImagesWidth + position - $('.gWrapper').width();
        if (where == 'left') {
            console.log('left');
            if ($('.gWrapper').position().left - 16 == position) {
                alert('Слева пусто');
            } else {
                $('.gLine').css('left', 0);
            }
        } else if (where == 'right') {
            console.log('right');
            if (ostatok >= vidimo) {
                position = position - galleryCarousel.fullVisibleImages() * $('.linkForImg').outerWidth(true);
            } else {
                position = position - ostatok;
            }
            $('.gLine').css('left', position + 'px');
        } else {
            console.log('Ошибка поворота карусели');
        }
    }
    $('#buttonLeft').on('click', function() {
        if (galleryCarousel.fullVisibleImages() < galleryCarousel.gImagesCount) {
            galleryCarousel.turn('left');
        }
    });
    $('#buttonRight').on('click', function() {
        if (galleryCarousel.fullVisibleImages() < galleryCarousel.gImagesCount) {
            galleryCarousel.turn('right');
        }
    });
});