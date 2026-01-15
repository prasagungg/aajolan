<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Obstacle } from './types'; 
  import ScoreBoard from './lib/components/ScoreBoard.svelte';
  import Character from './lib/components/Character.svelte';
  import ObstacleItem from './lib/components/ObstacleItem.svelte';
  import Overlay from './lib/components/Overlay.svelte';


  const GRAVITY = 0.6;
  const JUMP_FORCE = 15;
  const SPEED = 5;
  const SPAWN_RATE = 100;
  const DINO_X = 50;
  const DINO_SIZE = 40;


  let isPlaying = $state(false);
  let isGameOver = $state(false);
  let score = $state(0);
  let highScore = $state(0);
  
  let dinoY = $state(0); 
  let velocity = $state(0);
  let obstacles = $state<Obstacle[]>([]);

  let gameLoopId: number;
  let frameCount = 0;

  function jump() {
    if (dinoY === 0 && isPlaying) {
      velocity = JUMP_FORCE;
    } else if (!isPlaying && !isGameOver) {
      startGame();
    } else if (isGameOver) {
      resetGame();
    }
  }

  function startGame() {
    isPlaying = true;
    loop();
  }

  function resetGame() {
    isGameOver = false;
    isPlaying = true;
    score = 0;
    obstacles = [];
    dinoY = 0;
    velocity = 0;
    frameCount = 0;
    loop();
  }

  function updatePhysics() {
    dinoY += velocity;
    
    if (dinoY > 0) { 
      velocity -= GRAVITY;
    } else { 
      dinoY = 0;
      velocity = 0;
    }

  
    obstacles = obstacles
      .map(obs => ({ ...obs, x: obs.x - SPEED }))
      .filter(obs => obs.x > -50);

    frameCount++;
    if (frameCount % SPAWN_RATE === 0) {
      if (Math.random() > 0.3) {
        obstacles.push({ x: 800, h: 40 + Math.random() * 20, id: Date.now() });
      }
    }

    for (const obs of obstacles) {
      const isCollidingX = obs.x < (DINO_X + DINO_SIZE - 10) && (obs.x + 30) > (DINO_X + 10);
      const isCollidingY = dinoY < obs.h; 

      if (isCollidingX && isCollidingY) {
        gameOver();
      }
    }

    if (frameCount % 10 === 0) {
      score++;
    }
  }

  function gameOver() {
    isPlaying = false;
    isGameOver = true;
    cancelAnimationFrame(gameLoopId);
    if (score > highScore) highScore = score;
  }

  function loop() {
    if (!isPlaying) return;
    updatePhysics();
    gameLoopId = requestAnimationFrame(loop);
  }
 
  function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      jump();
    }
  }

  onDestroy(() => {
    cancelAnimationFrame(gameLoopId);
  });
</script>

<svelte:window onkeydown={handleKeydown} onmousedown={jump} />

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 select-none font-mono">
  
  <ScoreBoard {score} {highScore} />
  
  <div class="relative w-200 h-75 border-b-2 border-gray-800 bg-gray-100 overflow-hidden shadow-lg rounded-t-lg">
    
    <Character y={dinoY} x={DINO_X} size={DINO_SIZE} />

    {#each obstacles as obs (obs.id)}
      <ObstacleItem x={obs.x} height={obs.h} />
    {/each}

    <Overlay {isGameOver} {isPlaying} />

  </div>
  
  <p class="mt-4 text-gray-400 text-sm">Tap area atau tekan Spasi untuk melompat</p>
</div>