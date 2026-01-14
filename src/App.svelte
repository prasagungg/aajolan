<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  interface Obstacle {
    x: number;
    h: number;
  }

  // --- Konfigurasi Game ---
  const GRAVITY: number = 0.6;
  const JUMP_FORCE: number = 15;
  const SPEED: number = 5;
  const SPAWN_RATE: number = 100;

  // --- State Game ---
  let isPlaying: boolean = false;
  let isGameOver: boolean = false;
  let score: number = 0;
  let highScore: number = 0;
  let gameLoopId: number; // ID untuk requestAnimationFrame
  let frameCount: number = 0;

  // --- State Dino ---
  let dinoY: number = 0; // 0 = di tanah
  let velocity: number = 0;
  const dinoX: number = 50;
  const dinoSize: number = 40;

  // --- State Rintangan ---
  let obstacles: Obstacle[] = [];

  function jump(): void {
    if (dinoY === 0 && isPlaying) {
      velocity = JUMP_FORCE;
    } else if (!isPlaying && !isGameOver) {
      startGame();
    } else if (isGameOver) {
      resetGame();
    }
  }

  function startGame(): void {
    isPlaying = true;
    loop();
  }

  function resetGame(): void {
    isGameOver = false;
    isPlaying = true;
    score = 0;
    obstacles = [];
    dinoY = 0;
    velocity = 0;
    loop();
  }

  function updatePhysics(): void {
    // 1. Logika Lompat & Gravitasi
    dinoY += velocity;
    
    if (dinoY > 0) { 
      velocity -= GRAVITY;
    } else { 
      dinoY = 0;
      velocity = 0;
    }

    // 2. Logika Rintangan
    obstacles = obstacles
      .map(obs => ({ ...obs, x: obs.x - SPEED }))
      .filter(obs => obs.x > -50);

    frameCount++;
    if (frameCount % SPAWN_RATE === 0) {
      if (Math.random() > 0.3) {
        obstacles = [...obstacles, { x: 800, h: 40 + Math.random() * 20 }];
      }
    }

    // 3. Deteksi Tabrakan
    for (const obs of obstacles) {
      const isCollidingX = obs.x < (dinoX + dinoSize - 10) && (obs.x + 30) > (dinoX + 10);
      const isCollidingY = dinoY < obs.h; 

      if (isCollidingX && isCollidingY) {
        gameOver();
      }
    }

    // 4. Update Score
    if (frameCount % 10 === 0) {
      score++;
    }
  }

  function gameOver(): void {
    isPlaying = false;
    isGameOver = true;
    cancelAnimationFrame(gameLoopId);
    if (score > highScore) highScore = score;
  }

  function loop(): void {
    if (!isPlaying) return;
    updatePhysics();
    gameLoopId = requestAnimationFrame(loop);
  }
 
  // Input Keyboard dengan Tipe Event
  function handleKeydown(e: KeyboardEvent): void {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      jump();
    }
  }

  onDestroy(() => {
    cancelAnimationFrame(gameLoopId);
  });
</script>

<svelte:window on:keydown={handleKeydown} on:mousedown={jump} />

<div class="game-container">
  <div class="score">Score: {score} | HI: {highScore}</div>
  
  <div class="world">
    <div 
      class="dino" 
      style="bottom: {dinoY}px; left: {dinoX}px; width: {dinoSize}px; height: {dinoSize}px;">
      🦖
    </div>

    {#each obstacles as obs (obs.x)}
      <div 
        class="cactus" 
        style="left: {obs.x}px; height: {obs.h}px;">
        🌵
      </div>
    {/each}

    <div class="ground"></div>

    {#if !isPlaying && !isGameOver}
      <div class="ui-message">Tekan SPASI untuk Mulai</div>
    {/if}

    {#if isGameOver}
      <div class="ui-message game-over">
        GAME OVER<br/>
        <small>Tekan SPASI untuk Ulang</small>
      </div>
    {/if}
  </div>
</div>

<style>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Courier New', Courier, monospace;
    margin-top: 50px;
    user-select: none;
  }

  .world {
    position: relative;
    width: 800px;
    height: 300px;
    border-bottom: 2px solid #333;
    background-color: #f7f7f7;
    overflow: hidden;
  }

  .score {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .dino {
    position: absolute;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
  }

  .cactus {
    position: absolute;
    bottom: 0;
    width: 30px;
    background-color: #2a9d8f;
    border-radius: 5px 5px 0 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    font-size: 20px;
  }

  .ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: #333;
  }

  .ui-message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    cursor: pointer;
    z-index: 10; /* Memastikan UI di atas elemen lain */
  }

  .game-over {
    background: rgba(200, 0, 0, 0.8);
  }
</style>