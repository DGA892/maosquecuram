/**
* Template Name: eStartup
* Template URL: https://bootstrapmade.com/estartup-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });
    // Função para habilitar edição do campo
    function enableField(fieldId) {
      const field = document.getElementById(fieldId);
      field.removeAttribute('readonly');
      field.focus();
    }

    // Submissão do formulário
    const profileForm = document.getElementById('profileForm');
    profileForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const telefone = document.getElementById('telefone').value;
      alert(`Perfil atualizado!\n\nNome: ${nome}\nEmail: ${email}\nTelefone: ${telefone}`);
    });

    // Alterar foto de perfil
    const uploadPhoto = document.getElementById('uploadPhoto');
    const profileImage = document.getElementById('profileImage');

    uploadPhoto.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImage.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });
   const appointments = [
            { data: '2025-09-05', hora: '14:00', servico: 'Massagem Relaxante', profissional: 'Ana Paula', cliente: 'Rodrigo', status: 'Confirmado' },
            { data: '2025-09-12', hora: '16:30', servico: 'Drenagem Linfática', profissional: 'Marcos Silva', cliente: 'Luzia', status: 'Pendente' },
            { data: '2025-09-20', hora: '10:00', servico: 'Reflexologia', profissional: 'Carla Souza', cliente: 'Joedson', status: 'Concluído' }
        ];

        let currentIndex = null;

        function renderAppointments() {
            const tbody = document.getElementById('appointments-body');
            tbody.innerHTML = '';
            appointments.forEach((a, i) => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${new Date(a.data).toLocaleDateString('pt-BR')}</td>
          <td>${a.hora}</td>
          <td>${a.servico}</td>
          <td>${a.profissional}</td>
          <td>${a.cliente}</td>
          <td>${statusBadge(a.status)}</td>
          <td>${actionButtons(a.status, i)}</td>
        `;
                tbody.appendChild(row);
            });
        }

        function statusBadge(status) {
            switch (status) {
                case 'Confirmado': return '<span class="badge bg-success">Confirmado</span>';
                case 'Pendente': return '<span class="badge bg-warning text-dark">Pendente</span>';
                case 'Concluído': return '<span class="badge bg-secondary">Concluído</span>';
                default: return status;
            }
        }

        function actionButtons(status, index) {
            if (status === 'Concluído') {
                return '<button class="btn btn-secondary btn-sm" disabled>Indisponível</button>';
            }

            const appointmentDateTime = new Date(`${appointments[index].data}T${appointments[index].hora}`);
            const now = new Date();
            const hoursDiff = (appointmentDateTime - now) / (1000 * 60 * 60);

            if (hoursDiff < 24) {
                return `
      <button class="btn btn-warning btn-sm" disabled title="Só é possível remarcar com mais de 24h de antecedência">Remarcar</button>
      <button class="btn btn-danger btn-sm" onclick="openCancelModal(${index})">Cancelar</button>
    `;
            }

            return `
    <button class="btn btn-warning btn-sm" onclick="openEditModal(${index})">Remarcar</button>
    <button class="btn btn-danger btn-sm" onclick="openCancelModal(${index})">Cancelar</button>
  `;
        }

        // Abrir modal Remarcar
        function openEditModal(index) {
            currentIndex = index;
            document.getElementById('new-date').value = appointments[index].data;
            document.getElementById('new-time').value = appointments[index].hora;

            const appointmentDateTime = new Date(`${appointments[index].data}T${appointments[index].hora}`);
            const now = new Date();
            const hoursDiff = (appointmentDateTime - now) / (1000 * 60 * 60);
            document.getElementById('modal-warning').style.display = hoursDiff < 24 ? 'block' : 'none';
            document.getElementById('save-btn').disabled = hoursDiff < 24;

            document.getElementById('editModal').style.display = 'block';
        }

        document.querySelector('#editModal .close').onclick = () => document.getElementById('editModal').style.display = 'none';
        window.onclick = function (event) {
            if (event.target == document.getElementById('editModal')) {
                document.getElementById('editModal').style.display = 'none';
            }
            if (event.target == document.getElementById('cancelModal')) {
                document.getElementById('cancelModal').style.display = 'none';
            }
        }

        document.getElementById('save-btn').onclick = function () {
            const newDate = document.getElementById('new-date').value;
            const newTime = document.getElementById('new-time').value;
            if (newDate && newTime) {
                appointments[currentIndex].data = newDate;
                appointments[currentIndex].hora = newTime;
                renderAppointments();
                document.getElementById('editModal').style.display = 'none';
            }
        }

        // Modal Cancelar
        function openCancelModal(index) {
            currentIndex = index;
            document.getElementById('cancelModal').style.display = 'block';
        }

        document.getElementById('close-cancel').onclick = () => document.getElementById('cancelModal').style.display = 'none';
        document.getElementById('cancel-no').onclick = () => document.getElementById('cancelModal').style.display = 'none';
        document.getElementById('cancel-yes').onclick = function () {
            appointments.splice(currentIndex, 1);
            renderAppointments();
            document.getElementById('cancelModal').style.display = 'none';
        }

        renderAppointments();


})();