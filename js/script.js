
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Hero background slider
    const hero = document.querySelector('.hero');
    if (hero) {
        const images = [
            'https://images.pexels.com/photos/7148569/pexels-photo-7148569.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/5868136/pexels-photo-5868136.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/7752833/pexels-photo-7752833.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/4210850/pexels-photo-4210850.jpeg?auto=compress&cs=tinysrgb&w=1600',
            'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1600'
        ];

        // Preload images
        images.forEach(src => {
            const img = new Image(); img.src = src;
        });

        // Create two background layers for crossfade
        let idx = 0;
        const layerA = document.createElement('div');
        const layerB = document.createElement('div');
        layerA.className = 'hero-bg';
        layerB.className = 'hero-bg';
        layerA.style.backgroundImage = `url(${images[0]})`;
        layerB.style.backgroundImage = `url(${images[1 % images.length]})`;
        hero.appendChild(layerA);
        hero.appendChild(layerB);
        layerA.classList.add('visible');

        let visibleLayer = layerA;
        let hiddenLayer = layerB;
        idx = 1;

        setInterval(() => {
            idx = (idx + 1) % images.length;
            // set next image on hidden layer then fade it in
            hiddenLayer.style.backgroundImage = `url(${images[idx]})`;
            hiddenLayer.classList.add('visible');
            visibleLayer.classList.remove('visible');

            // swap references
            const tmp = visibleLayer;
            visibleLayer = hiddenLayer;
            hiddenLayer = tmp;
        }, 6000);
    }

    // Portfolio Modal Logic
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImg = document.getElementById('modalImage');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const closeBtn = document.querySelector('.close-btn');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let currentImageIndex;

        const openModal = (index) => {
            currentImageIndex = index;
            const imgSrc = galleryItems[currentImageIndex].querySelector('img').src.replace('w=600', 'w=1600');
            modalImg.src = imgSrc;
            modal.classList.add('active');
        };

        const closeModal = () => {
            modal.classList.remove('active');
        };

        const showNextImage = () => {
            const nextIndex = (currentImageIndex + 1) % galleryItems.length;
            openModal(nextIndex);
        };

        const showPrevImage = () => {
            const prevIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            openModal(prevIndex);
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });

        closeBtn.addEventListener('click', closeModal);
        nextBtn.addEventListener('click', showNextImage);
        prevBtn.addEventListener('click', showPrevImage);
        modal.addEventListener('click', (e) => e.target === modal && closeModal());
    }
});