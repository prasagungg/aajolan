<script lang="ts">
  interface Props {
    y: number;
    x: number;
    size: number;
  }

  let { y, x, size }: Props = $props(); 
</script>

<div 
  class="absolute flex items-center justify-center text-3xl bg-gray-800 rounded shadow-sm"
  style="bottom: {y}px; left: {x}px; width: {size}px; height: {size}px;"
>
  🦖
</div>