<script lang="ts">
  import { spring } from 'svelte/motion';
  import { onMount } from 'svelte';

  // Spring physics for smooth following
  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.1,
    damping: 0.50
  });

  let isPointer = false;
  let isHidden = true;

  onMount(() => {
    // Don't initialize on touch devices
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      isHidden = false;
      coords.set({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a clickable element (Button, Link, FAQ)
      const target = e.target as HTMLElement;
      isPointer = window.getComputedStyle(target).cursor === 'pointer';
    };

    const handleMouseOut = () => isHidden = true;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseOut);
    };
  });
</script>

<div 
  class="cursor-wrapper {isHidden ? 'opacity-0' : 'opacity-100'}"
  style="transform: translate({$coords.x}px, {$coords.y}px)"
>
  <div class="cursor-ring {isPointer ? 'scale-150 border-slate-900' : 'scale-100 border-white/50'}"></div>
  
  <div class="cursor-dot {isPointer ? 'opacity-0' : 'opacity-100'}"></div>
</div>

<style>
 

  .cursor-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    pointer-events: none; 
    z-index: 9999;
    transition: opacity 0.3s ease;
  }

  .cursor-ring {
    position: absolute;
    width: 40px;
    height: 40px;
    margin-top: -20px;
    margin-left: -20px;
    border: 1.5px solid white;
    border-radius: 50%;
    transition: transform 0.3s ease, border-color 0.3s ease;
    backdrop-filter: invert(0.1); 
  }

  .cursor-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    margin-top: -3px;
    margin-left: -3px;
    background-color: white;
    border-radius: 50%;
    mix-blend-mode: difference;
  }

  @media (hover: none) and (pointer: coarse) {
    .cursor-wrapper {
      display: none;
    }
  }
</style>