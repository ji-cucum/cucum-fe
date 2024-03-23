<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold text-gray-800">HOME</router-link>
        <ul class="flex space-x-4">
          <li>
            <router-link to="/login_GoogleAccount" class="text-gray-800 hover:text-blue-600">Login</router-link>
          </li>
          <li>
            <router-link to="/register_googleAccount" class="text-gray-800 hover:text-blue-600">Sign up</router-link>
          </li>
        </ul>
    </div>
  </nav>
</template> 
