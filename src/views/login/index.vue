<template>
  <div class="login-page">
    <!-- 动态粒子背景 -->
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <!-- 左侧品牌区域 -->
    <div class="brand-side">
      <div class="brand-content">
        <div class="brand-logo-area">
          <img
            src="@/assets/images/xdd-logo.png"
            alt="小叮当"
            class="brand-logo"
          />
          <h1 class="brand-name">小叮当</h1>
        </div>
        <p class="brand-slogan">管理尽在掌握</p>
        <h2 class="brand-title">孕妈小叮当<br />后台管理系统</h2>
        <div class="brand-tags">
          <span v-for="tag in ['专业', '易用', '高效']" :key="tag" class="tag">
            <span class="tag-dot"></span>
            {{ tag }}
          </span>
        </div>
        <div class="brand-decoration">
          <div class="deco-ring ring-1"></div>
          <div class="deco-ring ring-2"></div>
          <div class="deco-ring ring-3"></div>
        </div>
      </div>
    </div>

    <!-- 右侧登录区域 -->
    <div class="form-side">
      <div class="form-container">
        <LoginForm />
      </div>
      <div class="login-footer">
        <a
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright © 2024 小叮当 &amp; Made by csjinmo &amp;
          湘ICP备2024068072号
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import LoginForm from './components/login-form.vue';

  const particleCanvas = ref<HTMLCanvasElement>();
  let animationId = 0;

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
  }

  onMounted(() => {
    const canvas = particleCanvas.value;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const count = Math.floor((width * height) / 18000);

    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 160, 255, ${p.opacity})`;
        ctx.fill();

        // 连线
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(120, 160, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
  });
</script>

<style lang="less" scoped>
  .login-page {
    display: flex;
    height: 100vh;
    overflow: hidden;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    position: relative;
  }

  .particle-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* 左侧品牌区 */
  .brand-side {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px;
    overflow: hidden;
  }

  .brand-content {
    position: relative;
    z-index: 2;
  }

  .brand-logo-area {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  .brand-logo {
    width: 56px;
    height: 56px;
    filter: drop-shadow(0 0 20px rgba(120, 160, 255, 0.4));
    animation: float 3s ease-in-out infinite;
  }

  .brand-name {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa, #a78bfa, #f472b6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 2px;
  }

  .brand-slogan {
    font-size: 15px;
    color: rgba(148, 163, 184, 0.8);
    letter-spacing: 4px;
    margin-bottom: 32px;
    text-transform: uppercase;
  }

  .brand-title {
    font-size: 48px;
    font-weight: 800;
    line-height: 1.2;
    color: #e2e8f0;
    margin-bottom: 40px;
    letter-spacing: 2px;
  }

  .brand-tags {
    display: flex;
    gap: 32px;
  }

  .tag {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: rgba(148, 163, 184, 0.9);
    font-weight: 500;
    letter-spacing: 2px;
  }

  .tag-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    box-shadow: 0 0 12px rgba(96, 165, 250, 0.6);
  }

  /* 装饰环 */
  .brand-decoration {
    position: absolute;
    top: -100px;
    right: -200px;
    width: 500px;
    height: 500px;
  }

  .deco-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(96, 165, 250, 0.1);

    &.ring-1 {
      width: 400px;
      height: 400px;
      top: 50px;
      left: 50px;
      animation: spin 30s linear infinite;
    }

    &.ring-2 {
      width: 300px;
      height: 300px;
      top: 100px;
      left: 100px;
      border-color: rgba(167, 139, 250, 0.1);
      animation: spin 25s linear infinite reverse;
    }

    &.ring-3 {
      width: 200px;
      height: 200px;
      top: 150px;
      left: 150px;
      border-color: rgba(244, 114, 182, 0.08);
      animation: spin 20s linear infinite;
    }
  }

  /* 右侧表单区 */
  .form-side {
    position: relative;
    z-index: 1;
    width: 520px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(40px);
    border-left: 1px solid rgba(148, 163, 184, 0.08);
  }

  .form-container {
    width: 100%;
    max-width: 380px;
    padding: 0 40px;
  }

  .login-footer {
    position: absolute;
    bottom: 24px;
    left: 0;
    right: 0;
    text-align: center;

    a {
      color: rgba(148, 163, 184, 0.4);
      font-size: 12px;
      text-decoration: none;
      transition: color 0.3s;

      &:hover {
        color: rgba(148, 163, 184, 0.7);
      }
    }
  }

  /* 动画 */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* 响应式 */
  @media (max-width: 1024px) {
    .brand-side {
      display: none;
    }

    .form-side {
      width: 100%;
      border-left: none;
    }
  }

  @media (max-width: 768px) {
    .form-container {
      padding: 0 24px;
    }
  }
</style>
