        document.addEventListener('DOMContentLoaded', function() {
            
            const themeToggle = document.getElementById('theme-toggle');
            const themeLabel = document.querySelector('.theme-label');
            const favicon = document.getElementById('favicon');
            const siteLogo = document.getElementById('site-logo');
            const footerLogo = document.querySelector('.footer-logo');
            const navButtons = document.querySelectorAll('.terminal-nav .retro-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            const modal = document.getElementById('install-modal');
            const installBtn = document.querySelector('.install-btn');
            const closeBtn = document.querySelector('.close-btn');

            
            function initTheme() {
                const savedTheme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', savedTheme);
                themeToggle.checked = savedTheme === 'light';
                updateThemeText(savedTheme);
                updateIcons(savedTheme);
            }

            
            function updateThemeText(theme) {
                themeLabel.textContent = theme === 'dark' ? 'ТЕМНАЯ ТЕМА' : 'СВЕТЛАЯ ТЕМА';
            }

            
            function updateIcons(theme) {
                const suffix = theme === 'dark' ? 'dark' : 'light';
                favicon.href = `images/icon-${suffix}.png`;
                siteLogo.src = `images/icon-${suffix}.png`;
                footerLogo.src = `images/icon-${suffix}.png`;
            }

            
            themeToggle.addEventListener('change', function() {
                const newTheme = this.checked ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeText(newTheme);
                updateIcons(newTheme);
            });

            function setupNavigation() {
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
            
                document.getElementById('home-content').classList.add('active');
                
                
                navButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        
                        navButtons.forEach(btn => btn.classList.remove('active'));
                        
                        
                        this.classList.add('active');
                        
                        
                        tabContents.forEach(content => {
                            content.classList.remove('active');
                        });
                        
                        
                        const page = this.getAttribute('data-page');
                        document.getElementById(`${page}-content`).classList.add('active');
                    });
                });
            }

            
            function setupModal() {
                if (installBtn) {
                    installBtn.addEventListener('click', () => {
                        modal.style.display = 'block';
                    });
                }

                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        modal.style.display = 'none';
                    });
                }

                window.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.display = 'none';
                    }
                });
            }

            initTheme();
            setupNavigation();
            setupModal();
        });
