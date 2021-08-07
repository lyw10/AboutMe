<template>
  <div id="project">
        <header class="relative">
          <video
            :src="pd.header[projectId-1].video"
            autoplay
            loop
            muted
            class="absolute header-video"
            ref="headerVideo"
          ></video>

          <ul class="per-flex" ref="headerUl">
            <li style="width: 10%">
              <projectWrap>{{pd.header[projectId-1].title}}</projectWrap>
              <projectWrap class="wrap-b" style="bottom: 0">{{pd.header[projectId-1].title}}</projectWrap>
            </li>
            <li style="width: 20%"></li>
            <li style="width: 10%; z-index: 10">
              <projectWrap>{{pd.header[projectId-1].title}}</projectWrap>
            </li>
            <li style="width: 35%">
              <projectWrap class="wrap-b" style="bottom: 0">{{pd.header[projectId-1].title}}</projectWrap>
            </li>
            <li style="width: 25%">
              <projectWrap>{{pd.header[projectId-1].title}}</projectWrap>
            </li>
          </ul>
        </header>

        <main style="width: 100%" class="per-flex flex-col">
          <section class="main-content">
            <h1 class="indent">{{pd.header[projectId-1].content}}</h1>
            <img style="display: none"/>
          </section>

          <section
            v-for="item,index in pd.currentMain"
            :key="index"
            class="relative per-flex flex-between"
          >
            <h1>{{item.descriptions}}</h1>
            <img :src="item.image"/>
          </section>
        </main>

        <footer class="next">
          <div class="per-flex" @click="next()">
            <span v-for="i in 2" :key="i" class="flex flex-around">
              <span v-for="n in 4" :key="n" :class="[n%2===0 ? 'outline-text' : '']">next project</span>
            </span>
          </div>
        </footer>
      </div>
</template>

<script>
import event from '../assets/event'
export default {
    name:'Project',
    data(){
        return{
            projectId:-1,
            pd: {},
        }
    },
    methods: {
        copyData(currentId,projectData) {
            this.projectId = currentId
            this.pd = projectData

            console.log('loadProject');

            this.$nextTick(()=>{
                const html = document.documentElement;
                const projectMove = this.$refs.headerUl.children
                const scrollVideo = this.$refs.headerVideo

                const proSection = document.querySelectorAll("main section");
        const sectionH1 = document.querySelectorAll("main section h1");
        const sectionImg = document.querySelectorAll("main section img");

                window.addEventListener("scroll", () => {
          let scrollProject = html.scrollTop;

          if (scrollProject > 0) {
            projectMove[2].classList.add("left-10");
            projectMove[3].classList.add("left-30");
            projectMove[4].classList.add("left-20");
            scrollVideo.classList.add("scroll-video");
          } else {
            projectMove[2].classList.remove("left-10");
            projectMove[3].classList.remove("left-30");
            projectMove[4].classList.remove("left-20");
            scrollVideo.classList.remove("scroll-video");
          }
          for (let i = 0; i < proSection.length; i++) {
            let scrollSction =
              proSection[i].getBoundingClientRect().top - html.clientHeight;
            // console.log(scrollSction);

            if (scrollSction <= -20) {
              sectionH1[i].classList.add("an-section");
              sectionImg[i].classList.add("an-section");
            } else {
              sectionH1[i].classList.remove("an-section");
              sectionImg[i].classList.remove("an-section");
            }
          }
                })
        })
        },
        next(){
          let nextNum = window.location.hash.split('/')[2]
          nextNum++
          this.projectId = nextNum
          window.location.hash = `#/project/${nextNum}`
        }
    },
    mounted() {
        // 绑定自定义事件
        event.$on('toProject', this.copyData)
        
    },
    components:{
      projectWrap:{
        template:`
          <div class="wrapper">
            <div class="header-content">
              <p><slot>BBBBBB</slot></p>
            </div>
          </div>
        `
      }
    }
}
</script>

<style scoped>
body {
  padding-bottom: 10rem;
}
header {
  width: 90vw;
  height: var(--headerHeight);
  min-height: 40rem;
  padding: 10rem 0;
  font-size: var(--pro-text);
  font-family: "NotoSansSC-900";
}
header > ul {
  width: 100%;
  height: 100%;
}
header > ul li {
  position: relative;
  overflow: hidden;
  left: 0;
  transition: all 0.5s ease-in-out;
}
header > ul li .wrapper {
  height: 50%;
  display: flex;
  position: absolute;
  width: 100%;
  overflow: hidden;
  color: var(--important);
}
header > ul li:nth-child(1) .wrap-b {
  left: -450%;
  width: 550%;
}
header > ul li:nth-child(3) .wrapper {
  left: -100%;
  width: 200%;
}
header > ul li:nth-child(4) .wrap-b {
  left: -157%;
  width: 220%;
}
header > ul li:nth-child(5) .wrapper {
  left: -80%;
  width: 180%;
}
header > ul li .wrapper >>> div p {
  width: max-content;
}
.left-10 {
  left: -20% !important;
}
.left-20 {
  left: -55% !important;
}
.left-30 {
  left: -30%;
}
header video {
  width: 100%;
  height: 100%;
  right: 10%;
  top: 60%;
  transform-origin: top;

  object-fit: cover;
  transform-style: flat;
  transform: perspective(900px) rotateX(20deg) rotateZ(-10deg);

  transition: all 0.5s ease-in-out;
}

.scroll-video {
  width: 70%;
  height: 90%;
  right: 0;
  top: 40%;
  transform-origin: top;
  transform: perspective(0) rotateX(0deg) rotateZ(0deg);
}

/* section */
main {
  margin-top: 40rem;
}
main section {
  margin-bottom: 20rem;
  padding: 0 12rem;
}
main .main-content h1 {
  width: 30%;
  font-size: var(--sm-text);
  margin-left: auto;
}

main section h1 {
  width: 15%;
  min-width: 15rem;
  font-size: var(--text);
  transform: translatey(10rem) scaleY(4) skewY(10deg);
}
main section img {
  width: 70%;
  height: 100%;
}
main section > * {
  transform: translatey(10rem) skewY(10deg);
  transform-origin: top left;
  opacity: 0;

  transition: all 0.6s ease-in-out;
}
.an-section {
  opacity: 1;
  transform: translatey(0);
}

/* footer */
footer {
  width: 100%;
  height: 100px;
  position: relative;

  overflow: hidden;
  font-size: var(--text);
  font-family: "NotoSansSC-900";
}

footer div {
  width: 200%;
  min-width: 300rem;
  position: absolute;

  animation: left 12s linear infinite;
}

footer span {
  flex: 1;
}

footer:hover {
  cursor: pointer;
}
footer:hover div > span > .outline-text {
  -webkit-text-stroke-color: var(--important);
  color: var(--important);
}
footer:hover div > span > :not(.outline-text) {
  color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: var(--important);
}

@media screen and (max-width: 768px) {
  header {
    margin-top: 30rem;
  }
  .scroll-video {
    width: 90%;
    top: 20%;
  }
  main {
    margin-top: 20rem;
  }
  main section {
    flex-direction: column;
    padding: 0 8rem;
  }
  main section h1 {
    width: 100%;
    margin-bottom: 2rem;
  }
  main section img {
    width: 100%;
  }
  footer {
    height: 70px;
  }
  .outline-text {
    -webkit-text-stroke-width: 1px;
  }
}

@media screen and (max-width: 640px) {
  main {
    margin-top: 10rem;
  }
  header {
    margin-top: 40rem;
  }
  .scroll-video {
    width: 90%;
    height: 80%;
    top: 20%;
  }
  main .main-content h1 {
    width: 70%;
    font-size: var(--sm-text);
  }
  main section {
    flex-direction: column;
    padding: 0 6rem;
  }
  main section h1 {
    width: 100%;
  }
  main section img {
    width: 100%;
  }
  footer {
    height: 30px;
    font-size: var(--big-text);
    font-family: "NotoSansSC-900";
  }
  .outline-text {
    -webkit-text-stroke-width: 1px;
  }
}

</style>