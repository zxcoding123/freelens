<script lang="ts">
  const { 
    title = "Manage Clients, Projects & Billing",
    subtitle = "A powerful offline-first platform to organize projects, track time, and generate invoices effortlessly."
  } = $props();

  import image from '$lib/assets/freelens_logo_bw.svg';
</script>

<style>
  @keyframes blurIn {
    0% {
      opacity: 0;
      filter: blur(20px);
      transform: translateY(8px);
    }
    100% {
      opacity: 1;
      filter: blur(0px);
      transform: translateY(0px);
    }
  }

  .blur-reveal {
    opacity: 0;
    animation: blurIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.35s; }
  .delay-3 { animation-delay: 0.6s; }
  .delay-4 { animation-delay: 0.85s; }
  .delay-5 { animation-delay: 1.1s; }
  .delay-6 { animation-delay: 1.35s; }
</style>

<section class="relative overflow-hidden bg-gray-950 text-white">

  <!-- gradient glow -->
  <div class="absolute inset-0 bg-gradient-to-br from-black-600/30 via-black-600/20 to-black-500/20 blur-3xl"></div>

  <!-- grid background -->
  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>

  <div class="relative max-w-7xl h-screen mx-auto px-6 py-28 text-center flex flex-col justify-center items-center">

    <div>
      <img src={image} alt="Freelens Logo" class="w-100 blur-reveal delay-1" />
    </div>

    <!-- badge -->
    <div class=" inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur text-sm mb-6 border border-white/10">
      Coming Soon
    </div>

    <!-- brand name -->
    <h1 class="blur-reveal delay-3 text-4xl md:text-6xl font-bold leading-tight mb-6 uppercase tracking-widest">
      Freelens.
    </h1>

    <!-- title -->
    <h1 class="blur-reveal delay-4  text-3xl md:text-4xl font-bold leading-tight mb-6">
      {title}
    </h1>

    <!-- subtitle -->
    <p class="blur-reveal delay-3 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
      {subtitle}
    </p>

    <!-- founder -->
    <p class="blur-reveal delay-3 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
      <b>Founded, developed and created by: Ahmad Pandaog Aquino</b>
    </p>

    <!-- roadmap note -->
    <h6 class="blur-reveal delay-4">Roadmap, features and journey coming soon.</h6>

  </div>

  <!-- bottom fade -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950"></div>

    <!-- buttons -->
    <!-- <div class="flex flex-col sm:flex-row justify-center gap-4">

      <a
        href="#get-started"
        class="px-8 py-3 rounded-lg bg-black-600 hover:bg-white hover:text-black transition font-semibold border border-white/20"
      >
        Get Started
      </a>

      <a
        href="#features"
        class="px-8 py-3 rounded-lg border border-white/20 hover:border-white/40 hover:bg-white/5 transition"
      >
        View Features
      </a>

    </div> -->

</section>