class LazyLoadedVideo {
    constructor(container) {
      this.container = container;
      this.videoSrc = container.dataset.videoSrc;
      this.video = null;
      this.observer = null;
      
      this.loop = container.dataset.loop;
      this.controls = container.dataset.controls;

      this.init();
    }

    init() {
      this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
        root: null,
        rootMargin: '200px',
        threshold: 0
      });
      this.observer.observe(this.container);
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadVideo();
          this.observer.unobserve(this.container);
          }
      });
    }

    loadVideo() {
      this.video = document.createElement('video');
      this.video.src = this.videoSrc;
      this.video.muted = true;
      this.video.autoplay = true;
      this.video.playsInline = true;
      
      this.video.loop = this.loop === "loop" ? true : false;
      this.video.controls = this.controls === "show" ? true : false;

      this.video.addEventListener('loadeddata', () => {
        this.container.appendChild(this.video);
        this.container.classList.add('video-loaded');
        this.video.play();
      });

      this.video.load();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const videoContainers = document.querySelectorAll('.custom-video-element');
    videoContainers.forEach(container => new LazyLoadedVideo(container));
});
