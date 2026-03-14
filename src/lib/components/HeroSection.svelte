<script>
  const { 
    title = "Manage Clients, Projects & Billing",
    subtitle = "A powerful offline-first platform to organize projects, track time, and generate invoices effortlessly."
  } = $props();
</script>

<section class="relative overflow-hidden bg-gray-950 text-white ">

  <!-- gradient glow -->
  <div class="absolute inset-0 bg-gradient-to-br from-black-600/30 via-black-600/20 to-black-500/20 blur-3xl"></div>

  <!-- grid background -->
  <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] [background-size:24px_24px]"></div>

  <div class="relative max-w-7xl h-screen mx-auto px-6 py-28 text-center flex flex-col justify-center items-center">

    <!-- badge -->
    <!-- <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur text-sm mb-6 border border-white/10">
      🚀 Offline First SaaS Tool
    </div> -->

      <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur text-sm mb-6 border border-white/10">
      Coming Soon
    </div>

    <!-- title -->

    <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6 uppercase tracking-widest">
     Freelens.
    </h1>

    <h1 class="text-3xl md:text-4xl font-bold leading-tight mb-6">
      {title}
    </h1>

    <!-- subtitle -->
    <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
      {subtitle}
    </p>

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

  </div>

  <!-- bottom fade -->
  <div class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950"></div>

</section>