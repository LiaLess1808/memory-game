<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Memory Game</title>
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    </head>

    <body>
        <h1>2000's Cartoon - Memory Game</h1>

        <div class="themes-dropdown-selection">
            <h2>Choose a Theme</h2>
            <h3>Click here to choose a theme</h3>
            <video autoplay loop muted>
                <source src="videoplayback.mp4" type="video/mp4">
            </video>
        </div>

        <div class="theme-carousel">
            <i class="bi bi-chevron-left" id="prev">
            </i>
            <ul class="theme-list">
                <li class="theme-card" data-theme="image-ben10">
                    <div class="theme">
                        <img src="image-ben10/background.jpg" alt="Ben 10" draggable="false">
                        <h2 class="title">Ben 10</h2>
                    </div>
                </li>
                <li class="theme-card" data-theme="image-tfop">
                    <div class="theme">
                        <img src="image-tfop/background.jpg" alt="The Fairly Odd Parents" draggable="false">
                        <h2 class="title">The Fairly Odd Parents</h2>
                    </div>
                </li>
                <li class="theme-card" data-theme="image-atla">
                    <div class="theme">
                        <img src="image-atla/background.jpg" alt="Avatar: The Last Airbender" draggable="false">
                        <h2 class="title">Avatar: The Last Airbender</h2>
                    </div>
                </li>
                <li class="theme-card" data-theme="image-sbsp">
                    <div class="theme">
                        <img src="image-sbsp/background.jpg" alt="Spongebob Squarepants" draggable="false">
                        <h2 class="title">Spongebob Squarepants</h2>
                    </div>
                </li>
                <li class="theme-card" data-theme="image-adventuretime">
                    <div class="theme">
                        <img src="image-adventuretime/background.jpg" alt="Adventure Time" draggable="false">
                        <h2 class="title">Adventure Time</h2>
                    </div>
                </li>
            </ul>
            <i class="bi bi-chevron-right" id="next"></i>
        </div>
        
        <div id="difficulty-container">
            <label for="difficulty">Choose Difficulty:</label>
            <div class="slider-container">
                <input type="range" id="difficulty" min="1" max="3" value="1">
                <strong id="difficulty-level">Easy</strong>
            </div>
        </div>

        <div id="button-container">
            <button id="start-button" onclick="startGame()">Start Game</button>
            <button id="restart-button" onclick="restartLevel()">Restart Level</button>
        </div>

        <div id="game-board"></div>
        <p id="game-message"></p>

        <footer>
            made by <strong id="creator"><a href="">Wagner Campos Lessa</a></strong>
        </footer>

        <script src="script.js"></script>
    </body>
</html>
