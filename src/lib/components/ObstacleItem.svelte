<script lang="ts">
  interface Props {
    x: number;
    height: number;
  }

  let { x, height }: Props = $props();
</script>

<div 
  class="absolute bottom-0 flex items-start justify-center text-xl bg-teal-600 rounded-t-md border-t-2 border-teal-700 w-7.5"
  style="left: {x}px; height: {height}px;"
>
  🌵
</div>