const killPreloader = () => {
    // Check if the page has been visited in this session
    if (!sessionStorage.getItem('preloaderShown')) {
        // Show the preloader on first load or page refresh
        $(".preloader").show();
        sessionStorage.setItem('preloaderShown', 'true');
    } else {
        // Hide the preloader when navigating back
        $(".preloader").hide();

        // Auto-click #load-trigger when .preloader is hidden
        if (!$(".preloader").is(":visible")) {
            $("#load-trigger").click();
        }
    }
}

export default killPreloader;
