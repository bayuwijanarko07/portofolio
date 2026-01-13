<template>
  <div>    
    <section class="about">
      <h1>{{ $t('AboutPage.title') }}</h1>
      <p>{{ $t('AboutPage.description') }}</p>
      
      <!-- About content -->
      <div class="content">
        <p>{{ $t('AboutPage.resume.paragraf_1') }}</p>
        <p>{{ $t('AboutPage.resume.paragraf_2') }}</p>
        <p>{{ $t('AboutPage.resume.paragraf_3') }}</p>
        <p>{{ $t('AboutPage.resume.paragraf_4') }}</p>
      </div>
      
      <!-- Buttons -->
      <div class="actions">
        <button class="btn-download">
          {{ $t('AboutPage.resume_download_button') }}
        </button>
        <button class="btn-download">
          {{ $t('AboutPage.portfolio_download_button') }}
        </button>
      </div>
    </section>
  </div>
</template>