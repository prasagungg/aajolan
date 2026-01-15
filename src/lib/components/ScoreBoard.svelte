<script lang="ts">
  interface Props {
    score: number;
    highScore: number;
  }
  let { score, highScore } : Props  = $props();
</script>

<div class="mb-4 text-xl font-bold text-gray-700 font-mono tracking-wider">
  Score: {score.toString().padStart(5, '0')} | HI: {highScore.toString().padStart(5, '0')}
</div>