<script lang="ts">
  import cactusUrl from '../../assets/cactus.png';

  interface Props {
    x: number;
    y: number;
    type: 'cactus' | 'text';
    text?: string;
  }

  let { x, y, type, text }: Props = $props();
  
  const colors = [
    'bg-green-100 border-green-300 text-green-900',
    'bg-white border-gray-200 text-gray-800',
    'bg-blue-100 border-blue-300 text-blue-900'
  ];

  let colorClass = $derived(text ? colors[text.length % colors.length] : '');
</script>

<div 
  class="absolute z-10 flex items-end justify-center pointer-events-none"
  style="left: {x}px; bottom: {y}px;"
>

  {#if type === 'cactus'}
    <img 
      src={cactusUrl} 
      alt="Cactus"
      class="w-auto h-12.5 object-contain pixelated drop-shadow-sm"
    />
  {:else}
    <div class="flex flex-col items-start w-35">
      <div class="{colorClass} border-2 px-3 py-2 rounded-2xl rounded-bl-none shadow-md relative z-10">
         <div class="text-[8px] font-bold opacity-50 mb-0.5 uppercase tracking-wide">Tetangga:</div>
         <p class="text-xs font-bold leading-tight">"{text}"</p>
      </div>
      <div class="{colorClass} w-3 h-3 border-b-2 border-l-2 transform rotate-45 -mt-2 ml-1 z-0 bg-inherit"></div>
    </div>
  {/if}

</div>

<style>
  .pixelated { image-rendering: pixelated; }
</style>