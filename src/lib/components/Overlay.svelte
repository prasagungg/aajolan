<script lang="ts">
  interface Props {
    isGameOver: boolean
    isPlaying: boolean
  }
  let { isGameOver, isPlaying }: Props = $props();
</script>

{#if !isPlaying && !isGameOver}
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-900/90 text-white px-8 py-6 rounded-lg text-center shadow-xl backdrop-blur-sm transition-all hover:scale-105 cursor-pointer">
    <p class="text-lg font-bold font-mono">Tekan SPASI untuk Mulai</p>
  </div>
{/if}

{#if isGameOver}
  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-red-900/90 text-white px-8 py-6 rounded-lg text-center shadow-xl backdrop-blur-sm border-2 border-red-500">
    <h2 class="text-2xl font-bold mb-2">GAME OVER</h2>
    <small class="font-mono text-gray-200">Tekan SPASI untuk Ulang</small>
  </div>
{/if}