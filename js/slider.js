$('#slider-checkbox').on('change', function() {
    let $slider = $('#amplitude-slider');
    if ($(this).prop('checked'))
        $slider.css('visibility', 'visible');
    else
        $slider.css('visibility', 'hidden');
});

$('#number-checkbox').on('change', function() {
    let $number = $('#amplitude-number');
    if ($(this).prop('checked'))
        $number.css('visibility', 'visible');
    else
        $number.css('visibility', 'hidden');
});


function validateInputNumber() {
    let $slider = $('#amplitude-slider');
    let $number = $('#amplitude-number');

    let min = parseInt($slider.attr('min-val'));
    let max = parseInt($slider.attr('max-val'));
    let val = parseInt($number.val());

    if (Number.isNaN(val))
        return;
    else {
        if (val < min) {
            $number.val(min);
            $slider[0].setSliderValue(min);
        }
        else if (val > max) {
            $number.val(max);
            $slider[0].setSliderValue(max);
        }
        else
            $slider[0].setSliderValue(val);

        $slider[0].triggerInput();
    }
}

function checkAmplitudeSettings(elm) {
    let $slider = $('#amplitude-slider')[0];
    let $number = $('#amplitude-number');

    if (elm.id === 'amplitude-slider') {
        $number.val($slider.getSliderValue());
        setChartAmplitude($slider.getSliderValue());
    }
    else if (elm.id === 'amplitude-number') {
        validateInputNumber();
        setChartAmplitude($number.val());
    }
    else {
        console.error('Error: Invalid argument in checkAmplitudeSettings function');
    }
}

$('#amplitude-slider').on('input', function() {
    checkAmplitudeSettings(this);
});
$('#amplitude-number').on('input', function() {
    checkAmplitudeSettings(this);
});
