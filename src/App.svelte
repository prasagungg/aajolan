<script lang="ts">
  import { onDestroy } from 'svelte';

  import type { Obstacle } from './types';
  import Character from './lib/components/Character.svelte';
  import ObstacleItem from './lib/components/ObstacleItem.svelte';
  import Overlay from './lib/components/Overlay.svelte';

  const GRAVITY = 0.8; 
  const JUMP_FORCE = 13;
  const INITIAL_SPEED = 6;    
  const MAX_SPEED = 18;       
  const SPEED_INCREMENT = 0.05;
  const SPAWN_RATE = 90;
  
  const DINO_X = 50;
  const DINO_SIZE = 40; 
  const DINO_DUCK_SIZE = 25; 

  const THOUGHTS_LIST = [
    "Kapan nikah?", "Mana calonnya?", "Kok sendirian?", "Temenmu udah 2 anak",
    "Jangan pilih-pilih", "Nanti tua lho", "Undangannya mana?", "Gak laku ya?",
    "Kerja di mana?", "Gaji berapa?", "Udah PNS?", "Belum punya rumah?",
    "Mobil kredit ya?", "Pinjem seratus", "Kerja main HP?", "Kapan naik pangkat?",
    "Kapan wisuda?", "Skripsi macet?", "Kuliah lama amat", "IPK berapa?",
    "Kok gemukan?", "Kok kurusan?", "Iteman ya", "Jerawatan tuh",
    "Muka boros", "Sering pulang malem?", "Beli paket mulu", "Sombong sekarang",
    "Beban orang tua", "Gak guna", "Malu sama tetangga"
  ];

  let gameSpeed = $state(INITIAL_SPEED);
  let isPlaying = $state(false);
  let isGameOver = $state(false);
  let score = $state(0);
  let highScore = $state(0);
  
  let dinoY = $state(0); 
  let velocity = $state(0);
  let isDucking = $state(false); 

  let obstacles = $state<Obstacle[]>([]);

  let gameLoopId: number;
  let frameCount = 0;


  function handleJump() {
    if (dinoY === 0 && isPlaying && !isDucking) {
      velocity = JUMP_FORCE;
    } else if (!isPlaying && !isGameOver) {
      startGame();
    } else if (isGameOver) {
      resetGame();
    }
  }

  function handleDuck(isDown: boolean) {
    if (!isPlaying) return;
    if (isDown) {
      isDucking = true;
      if (dinoY > 0) velocity = -15; 
    } else {
      isDucking = false;
    }
  }

  function startGame() { isPlaying = true; loop(); }

  function resetGame() {
    isGameOver = false;
    isPlaying = true;
    score = 0;
    obstacles = [];
    dinoY = 0;
    velocity = 0;
    frameCount = 0;
    gameSpeed = INITIAL_SPEED; 
    loop();
  }

  function gameOver() {
    isPlaying = false;
    isGameOver = true;
    cancelAnimationFrame(gameLoopId);
    if (score > highScore) highScore = score;
  }

  function updatePhysics() {
    let targetSpeed = INITIAL_SPEED + (score * SPEED_INCREMENT);
    gameSpeed = Math.min(targetSpeed, MAX_SPEED);

    dinoY += velocity;
    if (dinoY > 0) { 
      velocity -= GRAVITY;
    } else { 
      dinoY = 0;
      velocity = 0;
    }

    obstacles = obstacles
      .map(obs => ({ ...obs, x: obs.x - gameSpeed })) 
      .filter(obs => obs.x > -150);

    frameCount++;

    let currentSpawnRate = SPAWN_RATE;
    if (gameSpeed > 10) currentSpawnRate = 70; 
    if (gameSpeed > 14) currentSpawnRate = 50;

    if (frameCount % currentSpawnRate === 0) {
      const rand = Math.random();
      if (rand > 0.5) {
        obstacles.push({
          id: Date.now(),
          type: 'cactus',
          x: 800,
          y: 0, 
          width: 30,
          height: 50
        });
      } else {
       
        obstacles.push({
          id: Date.now(),
          type: 'text',
          x: 800,
          y: 28, 
          text: THOUGHTS_LIST[Math.floor(Math.random() * THOUGHTS_LIST.length)],
          width: 100, 
          height: 40
        });
      }
    }

    const currentDinoHeight = isDucking ? DINO_DUCK_SIZE : DINO_SIZE;

    for (const obs of obstacles) {
      // Hitbox X
      const dinoLeft = DINO_X + 10;
      const dinoRight = DINO_X + DINO_SIZE - 10;
      const obsLeft = obs.x + 5;
      const obsRight = obs.x + obs.width - 5;
      const collisionX = dinoRight > obsLeft && dinoLeft < obsRight;

      // Hitbox Y
      const dinoBottom = dinoY; 
      const dinoTop = dinoY + currentDinoHeight;
      const obsBottom = obs.y;
      const obsTop = obs.y + obs.height;
      
      // +5/-5 Tolerance
      const collisionY = dinoTop > (obsBottom + 5) && dinoBottom < (obsTop - 5);

      if (collisionX && collisionY) gameOver();
    }

    if (frameCount % 10 === 0) score++;
  }

  function loop() {
    if (!isPlaying) return;
    updatePhysics();
    gameLoopId = requestAnimationFrame(loop);
  }
 
  function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      handleJump();
    }
    if (e.code === 'ArrowDown') {
      e.preventDefault();
      handleDuck(true);
    }
  }

  function handleKeyup(e: KeyboardEvent) {
    if (e.code === 'ArrowDown') {
      handleDuck(false); 
    }
  }

  onDestroy(() => {
    if (typeof window !== 'undefined') cancelAnimationFrame(gameLoopId);
  });
</script>

<svelte:window onkeydown={handleKeydown} onkeyup={handleKeyup} />

<div class="flex flex-col items-center justify-center min-h-screen select-none font-sans overflow-hidden relative bg-slate-900">
  
  <div class="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] bg-size-[16px_16px]"></div>
  <div class="absolute inset-0 z-0 bg-linear-to-b from-slate-900 via-purple-900/40 to-slate-900"></div>

  <div class="z-10 text-center mb-6">
    <h1 class="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 drop-shadow-sm tracking-tighter uppercase italic transform -skew-x-6">
      AAJOLAN
    </h1>
    <p class="text-slate-400 text-sm md:text-base font-medium mt-2 tracking-wide">
      Hindari <span class="text-green-400 font-bold">Kaktus</span> & Tundukkan <span class="text-blue-300 font-bold">Omongan Pedas</span>
    </p>
  </div>

  <div class="z-20 -mb-5  relative">
     <div class="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-full shadow-xl flex gap-6 text-white">
        <div class="flex flex-col items-center">
          <span class="text-[10px] uppercase tracking-widest text-white/60 font-bold">Score</span>
          <span class="text-2xl font-mono font-bold text-yellow-400">{score.toString().padStart(5, '0')}</span>
        </div>
        <div class="w-px bg-white/20"></div>
        <div class="flex flex-col items-center">
          <span class="text-[10px] uppercase tracking-widest text-white/60 font-bold">High Score</span>
          <span class="text-2xl font-mono font-bold">{highScore.toString().padStart(5, '0')}</span>
        </div>
     </div>
  </div>
  
  <div class="relative z-10 w-200 max-w-[95vw] h-87.5 bg-linear-to-b from-sky-300 to-sky-100 overflow-hidden shadow-2xl rounded-xl border-[6px] border-slate-800 ring-4 ring-slate-800/50">
    
    <div class="absolute top-4 right-8 w-16 h-16 bg-yellow-300 rounded-full blur-sm animate-pulse shadow-[0_0_40px_rgba(253,224,71,0.6)]"></div>
    
    <div class="cloud absolute top-10 left-[10%] opacity-80 scale-150">☁️</div>
    <div class="cloud absolute top-20 left-[60%] opacity-60 scale-100 delay-1000">☁️</div>
    <div class="cloud absolute top-8 left-[90%] opacity-70 scale-125 delay-500">☁️</div>

    <Character 
      y={dinoY} 
      x={DINO_X} 
      size={DINO_SIZE} 
      isRunning={isPlaying} 
      isDucking={isDucking}
    />

    {#each obstacles as obs (obs.id)}
      <ObstacleItem x={obs.x} y={obs.y} type={obs.type} text={obs.text} />
    {/each}

    <div class="absolute bottom-0 w-full h-1.5 bg-emerald-600 border-t-4 border-emerald-700 z-10"></div>
    <div class="absolute bottom-0 w-full h-0.5 bg-emerald-800 z-20 translate-y-px"></div>

    <Overlay {isGameOver} {isPlaying} />

  </div>
  
  <div class="mt-8 flex gap-8 z-10">
    <div class="flex items-center gap-3 group">
      <div class="flex flex-col gap-1">
         <kbd class="kbd">Space</kbd>
         </div>
      <span class="text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-yellow-400 transition-colors">Lompat<br/>(Hindari Kaktus)</span>
    </div>

    <div class="flex items-center gap-3 group">
      <kbd class="kbd">↓</kbd>
      <span class="text-slate-400 text-xs font-bold uppercase tracking-wider group-hover:text-blue-400 transition-colors">Nunduk<br/>(Hindari Omongan)</span>
    </div>
  </div>

  <div class="absolute bottom-4 text-slate-600 text-[10px] font-mono opacity-50">
    PRESS START TO RUN FROM REALITY
  </div>

</div>

<style>
  .cloud {
    font-size: 2rem;
    color: white;
    animation: drift 20s linear infinite;
    filter: drop-shadow(0 4px 2px rgba(0,0,0,0.1));
  }

  @keyframes drift {
    from { transform: translateX(800px); }
    to { transform: translateX(-200px); }
  }

  .kbd {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.25rem 0.75rem;
    min-width: 2.5rem;
    min-height: 2.5rem;
    background: linear-gradient(to bottom, #f1f5f9, #cbd5e1);
    border: 1px solid #94a3b8;
    border-bottom-width: 4px;
    border-radius: 0.5rem;
    font-family: monospace;
    font-weight: bold;
    color: #334155;
    font-size: 0.875rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.1s;
  }
  
  .kbd:active {
    border-bottom-width: 1px;
    transform: translateY(3px);
  }
</style>