$(document).ready(function () {
  const collapseEl = $('#view-more-portfolio-main');
  const btn = $('.view-more-portfolio-btn');

  // When collapse hides
  collapseEl.on('hidden.bs.collapse', function () {
    btn.html('View More <i class="fa fa-chevron-down"></i>');
  });

  // When collapse shows
  collapseEl.on('shown.bs.collapse', function () {
    btn.html('Hide <i class="fa fa-chevron-up"></i>');
  });
  $(".first-block-text").animate(
    { dummy: 1 }, // dummy numeric property
    {
      duration: 1500,
      step: function (now) {
        const moveX = -300 + now * 300; // move from -300px → 0
        $(this).css("transform", `translateX(${moveX}px)`);
        $(this).css("opacity", now); // optional fade-in
      }
    }
  );

  $(".first-block-img").animate(
    { dummy: 1 }, // dummy numeric property
    {
      duration: 1500,
      step: function (now) {
        const moveX = 300 - now * 300; // move from 300px → 0
        $(this).css("transform", `translateX(${moveX}px)`);
        $(this).css("opacity", now); // optional fade-in
      }
    }
  );

  $(window).on("scroll", function () {
    console.log("scrolling");
    if ($(window).scrollTop() > 200) {
      $(".navbar").addClass("nav-bar-solid");
    } else {
      $(".navbar").removeClass("nav-bar-solid");
    }
  });

  $(".learn-more").on("click", function () {
    var lmId = $(this).attr("id");
    var contentId = $("#" + lmId + "-content");
    var img = $(this).closest(".card-body").find(".services-image");
    if (contentId.hasClass("hidden")) {
      contentId.removeClass("hidden");
      img.addClass("hidden");
      // $(this).html('<i class="fa fa-close"></i>');
    }
    else {
      contentId.addClass("hidden");
      img.removeClass("hidden");
      // $(this).html('Learn More <i class="fa fa-chevron-right"></i>');
    }
  });
  $(".scroll-down-indicator").on("click", function () {
    $('html, body').animate({
      scrollTop: $("#services").offset().top - 70
    }, 800);
  });
  $(document).on('click', '.btn-quote', function (event) {
    $("#dialog-body-mobile").html($(".contact-form-container").html());
  });

  $(document).on("submit", ".contactForm", function (e) {
  e.preventDefault();

  const form = this; // current form element
  const formData = new FormData(form);
  const submitBtn = $(form).find('button[type="submit"]');

submitBtn.html('<span class="spinner-border spinner-border-sm"></span> Sending...').prop('disabled', true);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSekxKaSAWWtbKnLcPBmu-TLMy1grBu972Xh_vRefHrDA0_Yrg/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData
  }).then(() => {
    form.reset(); // ✅ properly reset form
    // ✅ optional success feedback
    $(form).find('button[type="submit"]').prop('disabled', true).text('Sent ✓');
    alert('✅ Thank you — your message has been received! We’ll contact you within 1 business day.');
    setTimeout(() => {
      $(form).find('button[type="submit"]').prop('disabled', false).text('Submit');
    }, 2000);
  }).catch((error) => {
    console.error('Submission failed', error);
    alert('⚠️ There was a problem sending your message. Please try again.');
  });
});

});