<script lang="ts">
  import faceImage from '../../assets/muhyi.png';

  interface Props {
    y: number;
    x: number;
    size: number;
    isRunning?: boolean; 
    isDucking?: boolean; 
  }

  let { y, x, size, isRunning = false, isDucking = false }: Props = $props();

  let isGrounded = $derived(y === 0);
  let shouldAnimate = $derived(isRunning && isGrounded);

  const LEG_WIDTH = '8px';
  const LEG_HEIGHT = '16px';
  const LEG_BOTTOM_OFFSET = '-12px'; 
  const LEG_GAP = '6px';
  const GROUND_OFFSET = 12;
</script>

<div
  class="absolute z-20 flex justify-center transition-all duration-100"
  style="bottom: {y + GROUND_OFFSET}px; left: {x}px; width: {size}px;"
>
  <div 
    class="relative flex flex-col items-center transition-all duration-100" 
    style="height: {size}px; width: {size}px;"
  >

    <img
      src={faceImage}
      alt="Dino Face"
      class="relative w-full h-full rounded-full object-cover border-2 border-gray-800 shadow-md z-20 bg-white transition-transform duration-100 origin-bottom 
      {isDucking ? 'scale-y-[0.6] translate-y-2.5' : ''}"
    />

    <div
      class="absolute bottom-0 z-10 flex transition-opacity duration-100 {isDucking ? 'opacity-0' : 'opacity-100'}"
      style="margin-bottom: {LEG_BOTTOM_OFFSET}; gap: {LEG_GAP};"
    >
      <div
        class="bg-gray-900 border border-gray-700 rounded-sm origin-top {shouldAnimate ? 'animate-run-left' : ''}"
        style="width: {LEG_WIDTH}; height: {LEG_HEIGHT};"
      ></div>
      <div
        class="bg-gray-900 border border-gray-700 rounded-sm origin-top {shouldAnimate ? 'animate-run-right' : ''}"
        style="width: {LEG_WIDTH}; height: {LEG_HEIGHT};"
      ></div>
    </div>
    
    {#if isDucking && isGrounded}
       <div class="absolute -bottom-2 w-full h-1 bg-gray-300 rounded-full blur-[1px]"></div>
    {/if}

  </div>
</div>

<style>
  @keyframes run-left { 0% { transform: rotate(-30deg); } 100% { transform: rotate(30deg); } }
  @keyframes run-right { 0% { transform: rotate(30deg); } 100% { transform: rotate(-30deg); } }
  .animate-run-left { animation: run-left 0.15s infinite alternate ease-in-out; }
  .animate-run-right { animation: run-right 0.15s infinite alternate ease-in-out; }
</style>