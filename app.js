let currentScene = 0;
        const correctAnswers = [1, 1, 1]; // Correct answer indices
        let userAnswers = [-1, -1, -1]; // -1 means not answered
        
        function startStory() {
            document.querySelector('.character-map').classList.add('hidden');
            document.querySelector('.character-map').previousElementSibling.classList.add('hidden'); // Hide start button
            document.getElementById('story-content').classList.remove('hidden');
            updateSceneUI();
        }
        
        function nextScene() {
            const scenes = ['scene-1', 'scene-2', 'scene-3', 'scene-4'];
            if (currentScene < scenes.length - 1) {
                document.getElementById(scenes[currentScene]).classList.add('hidden');
                currentScene++;
                document.getElementById(scenes[currentScene]).classList.remove('hidden');
            }
            updateSceneUI();
        }
        
        function previousScene() {
            const scenes = ['scene-1', 'scene-2', 'scene-3', 'scene-4'];
            if (currentScene > 0) {
                document.getElementById(scenes[currentScene]).classList.add('hidden');
                currentScene--;
                document.getElementById(scenes[currentScene]).classList.remove('hidden');
            }
            updateSceneUI();
        }
        
        function showQuiz() {
            document.getElementById('scene-4').classList.add('hidden');
            document.getElementById('quiz-section').classList.remove('hidden');
            updateSceneUI();
        }
        
        function selectOption(element, questionIndex, answerIndex) {
            // Remove selected class from all options in this question
            const options = element.parentElement.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            element.classList.add('selected');
            
            // Store user's answer
            userAnswers[questionIndex] = answerIndex;
            
            // Enable submit button if all questions answered
            if (userAnswers.every(answer => answer !== -1)) {
                document.getElementById('submit-btn').disabled = false;
            }
        }
        
        function checkAnswers() {
            let score = 0;
            
            // Check each question and mark correct/incorrect
            for (let i = 0; i < 3; i++) {
                const question = document.querySelectorAll('.question')[i];
                const options = question.querySelectorAll('.option');
                
                options.forEach((option, index) => {
                    if (index === correctAnswers[i]) {
                        option.classList.add('correct');
                    } else if (index === userAnswers[i]) {
                        option.classList.add('incorrect');
                    }
                    option.style.pointerEvents = 'none'; // Disable further clicks
                });
                
                if (userAnswers[i] === correctAnswers[i]) {
                    score++;
                }
            }
            
            // Display score
            document.getElementById('submit-btn').classList.add('hidden');
            const scoreDisplay = document.getElementById('score-display');
            const scoreText = document.getElementById('score-text');
            const starsDiv = document.getElementById('stars');
            
            scoreText.textContent = `You got ${score} out of 3 correct!`;
            
            // Show stars based on score
            let starHTML = '';
            for (let i = 0; i < score; i++) {
                starHTML += '⭐';
            }
            for (let i = score; i < 3; i++) {
                starHTML += '☆';
            }
            starsDiv.innerHTML = starHTML;
            
            scoreDisplay.classList.remove('hidden');
        }

        // ---------- Improvements: progress + reading tools + tap support ----------
        const scenesList = ['scene-1', 'scene-2', 'scene-3', 'scene-4'];
        let storyFontStep = 0; // -3..+5
        let readingUtterance = null;

        function getVisibleSceneId() {
            for (const id of scenesList) {
                const el = document.getElementById(id);
                if (el && !el.classList.contains('hidden')) return id;
            }
            return scenesList[0];
        }

        function updateSceneUI() {
            const storyVisible = !document.getElementById('story-content').classList.contains('hidden');
            const progressWrap = document.getElementById('progress-wrap');
            if (!progressWrap) return;

            if (!storyVisible) {
                progressWrap.classList.add('hidden');
                return;
            }
            progressWrap.classList.remove('hidden');

            const sceneId = getVisibleSceneId();
            const idx = Math.max(0, scenesList.indexOf(sceneId));
            const pct = Math.round(((idx + 1) / scenesList.length) * 100);

            const label = document.getElementById('progress-label');
            const pctEl = document.getElementById('progress-pct');
            const fill = document.getElementById('progress-fill');
            const track = progressWrap.querySelector('.progress-track');

            if (label) label.textContent = `Scene ${idx + 1} of ${scenesList.length}`;
            if (pctEl) pctEl.textContent = `${pct}%`;
            if (fill) fill.style.width = `${pct}%`;
            if (track) track.setAttribute('aria-valuenow', String(pct));
        }

        function clamp(n, lo, hi){ return Math.max(lo, Math.min(hi, n)); }

        function applyFontSize() {
            // Base is 1.3em. Each step is ~0.08em.
            const size = 1.3 + (storyFontStep * 0.08);
            document.documentElement.style.setProperty('--story-font-size', `${clamp(size, 1.0, 1.9)}em`);
        }

        function increaseFont() {
            storyFontStep = clamp(storyFontStep + 1, -3, 5);
            applyFontSize();
        }

        function decreaseFont() {
            storyFontStep = clamp(storyFontStep - 1, -3, 5);
            applyFontSize();
        }

        function toggleDyslexiaFont() {
            document.body.classList.toggle('dyslexia-mode');
        }

        function getCurrentSceneText() {
            const sceneId = getVisibleSceneId();
            const scene = document.getElementById(sceneId);
            if (!scene) return '';
            const textEl = scene.querySelector('.story-text');
            return (textEl ? textEl.textContent : '').trim();
        }

        function getBestWarmFemaleVoice() {
            const voices = window.speechSynthesis.getVoices() || [];
            const preferred = [
                // Common high-quality voices (names vary by OS/browser)
                'Google US English',
                'Google UK English Female',
                'Samantha',
                'Victoria',
                'Moira',
                'Karen',
                'Serena',
                'Amelie',
                'Ava',
                'Allison'
            ];

            // Try: exact preferred names first
            for (const name of preferred) {
                const v = voices.find(x => (x.name || '').toLowerCase() === name.toLowerCase());
                if (v) return v;
            }

            // Try: any English female-ish names
            const femaleHints = ['female', 'woman', 'samantha', 'victoria', 'moira', 'karen', 'serena', 'amelie', 'ava', 'allison', 'zoe', 'tessa'];
            let v = voices.find(x =>
                (x.lang || '').toLowerCase().startsWith('en') &&
                femaleHints.some(h => (x.name || '').toLowerCase().includes(h))
            );
            if (v) return v;

            // Fallback: first English voice
            v = voices.find(x => (x.lang || '').toLowerCase().startsWith('en'));
            return v || voices[0] || null;
        }

        function populateVoiceSelect() {
            const select = document.getElementById('voiceSelect');
            if (!select) return;

            const voices = window.speechSynthesis.getVoices() || [];
            select.innerHTML = '';

            voices.forEach((v, i) => {
                const opt = document.createElement('option');
                opt.value = String(i);
                opt.textContent = `${v.name} (${v.lang})`;
                select.appendChild(opt);
            });

            const best = getBestWarmFemaleVoice();
            if (best) {
                const idx = voices.indexOf(best);
                if (idx >= 0) select.value = String(idx);
            }
        }

        function getSelectedVoice() {
            const select = document.getElementById('voiceSelect');
            const voices = window.speechSynthesis.getVoices() || [];
            if (!select || voices.length === 0) return getBestWarmFemaleVoice();
            const idx = parseInt(select.value, 10);
            return voices[idx] || getBestWarmFemaleVoice();
        }

        function readAloud() {
            const text = getCurrentSceneText();
            if (!text) return;

            if (!('speechSynthesis' in window)) {
                alert('Read-aloud is not supported in this browser.');
                return;
            }

            stopReading(); // stop any previous
            readingUtterance = new SpeechSynthesisUtterance(text);

            const voice = getSelectedVoice();
            if (voice) readingUtterance.voice = voice;

            // Warmer cadence
            readingUtterance.rate = 0.92;
            readingUtterance.pitch = 1.10;
            readingUtterance.volume = 1.0;

            window.speechSynthesis.speak(readingUtterance);
        }

        function stopReading() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            readingUtterance = null;
        }

        // Tap support for character cards (mobile + touch devices)
        function setupCharacterTap() {
            const cards = document.querySelectorAll('.character-card');
            cards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.addEventListener('click', () => {
                    cards.forEach(c => { if (c !== card) c.classList.remove('active'); });
                    card.classList.toggle('active');
                });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });
            });

            // Clicking outside clears active state
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.character-card')) {
                    cards.forEach(c => c.classList.remove('active'));
                }
            });
        }

        // Initialize improvements
        (function initImprovements(){
            applyFontSize();
            setupCharacterTap();
            updateSceneUI();
        
        // Ensure voice list is populated (voices may load asynchronously)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = populateVoiceSelect;
            populateVoiceSelect();
        }

        })();

