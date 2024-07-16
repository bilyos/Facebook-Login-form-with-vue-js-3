<template>
  <div class="min-h-screen flex items-center justify-center bg-white md:bg-gray-100">
    <div class="container mx-auto flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-blue-600 md:text-5xl">Welcome!</h1>
      <p class="text-2xl text-gray-700 mt-4">You have successfully logged in.</p>
      <div class="mt-4 text-center">
        <router-link to="/" class="text-blue-600 font-bold">
          <div class="rounded-lg shadow-lg bg-gray-100 w-8 h-8 flex items-center justify-center">
            <i class="fa-solid fa-circle-arrow-left"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
