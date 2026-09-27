<script setup>
import { computed, ref, watch } from "vue";
import { languages, profileData, roleProfiles } from "./data";

const lang = ref("sv");
const role = ref("frontend");
const dark = ref(false);
const showEditor = ref(false);

const t = computed(() => profileData.translations[lang.value]);
const currentRole = computed(() => roleProfiles[role.value]);

const isRTL = computed(() => lang.value === "ar");

const roleTitle = computed(() => currentRole.value.title[lang.value]);

const visibleSkills = computed(() => {
  const preferred = currentRole.value.focusSkills;
  const rest = profileData.skills.filter(s => !preferred.includes(s));
  return [...preferred, ...rest].slice(0, 50);
});

function printCV() {
  window.print();
}

function setLanguage(value) {
  lang.value = value;
  document.documentElement.lang = value;
}

watch(dark, value => {
  document.documentElement.dataset.theme = value ? "dark" : "light";
});

function addProject() {
  alert("Nästa steg: lägg till ett formulär som skriver nya projekt till data/localStorage.");
}
</script>

<template>
  <div class="app" :dir="isRTL ? 'rtl' : 'ltr'">
    <header class="topbar no-print">
      <div class="brand">
        <strong>{{ profileData.name }}</strong>
        <span>CV Portfolio Builder</span>
      </div>

      <div class="controls">
        <label>
          <span>{{ t.profile }}</span>
          <select v-model="role">
            <option value="frontend">{{ t.roleFrontend }}</option>
            <option value="ux">{{ t.roleUx }}</option>
            <option value="pedagogue">{{ t.rolePedagogue }}</option>
            <option value="correctional">{{ t.roleCorrectional }}</option>
          </select>
        </label>

        <label>
          <span>Language</span>
          <select :value="lang" @change="setLanguage($event.target.value)">
            <option v-for="item in languages" :key="item" :value="item">{{ item.toUpperCase() }}</option>
          </select>
        </label>

        <button @click="dark = !dark">{{ dark ? t.light : t.dark }}</button>
        <button class="primary" @click="printCV">{{ t.print }}</button>
      </div>
    </header>

    <main class="page">
      <section class="hero">
        <div>
          <p class="eyebrow">{{ roleTitle }}</p>
          <h1>{{ profileData.name }}</h1>
          <h2>{{ t.title }}</h2>
          <p class="lead">{{ t.target }}</p>
          <div class="contact">
            <span>📍 {{ profileData.location }}</span>
            <a :href="profileData.contact.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a :href="profileData.contact.portfolio" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <a :href="profileData.contact.github" target="_blank" rel="noopener noreferrer">Github</a>
            <a :href="`mailto:${profileData.contact.email}`">Email</a>
          </div>
        </div>
        <div class="hero-badge">CV</div>
      </section>

      <section class="grid">
        <div class="main-column">
          <article class="card">
            <h3>{{ t.aboutTitle }}</h3>
            <p>{{ t.about }}</p>
          </article>

          <article class="card">
            <h3>{{ t.goalTitle }}</h3>
            <p>{{ t.goal }}</p>
          </article>

          <article v-if="currentRole.show.includes('experience')" class="card">
            <h3>{{ t.experienceTitle }}</h3>
            <div v-for="item in profileData.experience" :key="item.title + item.date" class="timeline-item">
              <div class="date">{{ item.date }}</div>
              <h4>{{ item.title }}</h4>
              <div class="company">{{ item.company }}</div>
              <ul>
                <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </div>
            
          </article>

        <!-- Education + Courses -->
        <section class="education-courses">
  <!-- Courses -->
          <article class="card courses-card">

            <h3>{{t.coursesTitle}}</h3>

            <div
              v-for="course in profileData.courses"
              :key="course.title + course.date"
              class="timeline-item"
            >
              <div class="date">
                {{ course.date }}
              </div>

              <h4>
                {{ course.title }}
              </h4>

              <div class="company">
                {{ course.school }}
              </div>

              <p>
                {{ course.details }}
              </p>

              <p
                v-if="course.grade"
                class="course-meta"
              >
                <strong>{{ course.grade }}</strong>
              </p>

              <p
                v-if="course.certificate"
                class="course-meta"
              >
                <strong>{{ course.certificate }}</strong>
              </p>
            </div>

          </article>

          <!-- Education -->
          <article
            v-if="currentRole.show.includes('education')"
            class="card education-card"
          >
            <h3>{{ t.educationTitle }}</h3>

            <div
              v-for="item in profileData.education"
              :key="item.title + item.date"
              class="timeline-item"
            >
              <div class="date">{{ item.date }}</div>

              <h4>{{ item.title }}</h4>

              <div class="company">
                {{ item.school }}
              </div>

              <p>{{ item.details }}</p>
            </div>
          </article>


        
        </section>

          <article v-if="currentRole.show.includes('projects')" class="card">
            <div class="section-heading">
              <h3>{{ t.projectsTitle }}</h3>
              <button class="no-print small" @click="addProject">+ Project</button>
            </div>
            <div class="projects">
              <a v-for="project in profileData.projects" :key="project.name" class="project" :href="project.url" target="_blank">
                <div class="project-top">
                  <h4>{{ project.name }}</h4>
                  <span>↗</span>
                </div>
                <p>{{ project.description }}</p>
                <div class="tags">
                  <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                </div>
              </a>
            </div>
          </article>
        </div>

          <article class="card">
            <h3>{{ t.skillsTitle }}</h3>
            <div class="skill-list">
              <span v-for="skill in visibleSkills" :key="skill">{{ skill }}</span>
              <h4  style="background-color:#eef2f7; color: black; padding: 1rem; border-radius: 5%; display:block; align-items: center; justify-content: center;"><strong >Looking for internship </strong><hr> I am currently looking for an internship (LIA) as part of my education, where I can apply my UX, UI, and frontend skills,<hr> from November 9, 2026 to April 25, 2027</h4>
            </div>
          </article>

          <article class="card">
            <h3>{{ t.languagesTitle }}</h3>
            <div v-for="[name, level] in profileData.languages" :key="name" class="language-row">
              <strong>{{ name }}</strong>
              <span>{{ level }}</span>
            </div>
          </article>

          <article class="card no-print">
            <h3>{{ t.customize }}</h3>
            <p>All CV content is data-driven. Create several career versions without duplicating the whole website.</p>
            <button class="primary full" @click="showEditor = !showEditor">
              {{ showEditor ? "Hide editor" : "Open editor" }}
            </button>
            <div v-if="showEditor" class="editor">
              <label>Role title <input v-model="currentRole.title.en" /></label>
              <label>Location <input v-model="profileData.location" /></label>
              <label>Portfolio URL <input v-model="profileData.contact.portfolio" /></label>
                <div class="internship-card">
                  <h4>Looking for internship</h4>

                  <p>
                    I am currently looking for an internship (LIA) as part of my education,
                    where I can apply my UX, UI, and frontend skills.
                  </p>

                  <p>
                    <strong>November 9, 2026 – April 25, 2027</strong>
                  </p>
                </div>
            </div>
          </article>

        
        </section>

        <footer class="site-footer">
          <div class="footer-content">

            <div class="footer-brand">
              <strong>{{ profileData.name }}</strong>
              <span>CV Portfolio</span>
            </div>

            <nav class="footer-links" aria-label="Portfolio links">
              <a
                v-for="link in profileData.links"
                :key="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
                <span>↗</span>
              </a>
            </nav>

          </div>

          <div class="footer-bottom">
            <span>© {{ new Date().getFullYear() }} {{ profileData.name }}</span>
            <span>CV Portfolio Builder</span>
          </div>
        </footer>
      
    </main>
  </div>
</template>