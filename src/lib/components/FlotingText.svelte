<script lang="ts">
  interface Props {
    x: number;
    y: number; 
    text: string;
  }

  let { x, y, text }: Props = $props();
</script>

<div 
  class="absolute z-0 flex flex-col px-4 py-2 bg-white/50 border border-gray-300/50 rounded-full shadow-sm backdrop-blur-sm transition-all"
  style="left: {x}px; top: {y}px;"
>
  <p class="text-sm font-bold text-gray-500 italic whitespace-nowrap">
    "{text}"
  </p>
</div>