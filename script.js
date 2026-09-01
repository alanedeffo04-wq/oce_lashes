document.addEventListener('DOMContentLoaded', () => {
    const numWhatsApp = "+237692701967"; 

    // Traduction
    const langToggleBtn = document.getElementById('lang-toggle');
    const textElements = document.querySelectorAll('.lang-text');
    const placeholderElements = document.querySelectorAll('.lang-placeholder');
    let currentLang = 'fr'; 

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'fr' ? 'en' : 'fr';
        langToggleBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR'; 

        textElements.forEach(el => {
            el.textContent = el.getAttribute(currentLang === 'en' ? 'data-en' : 'data-fr');
        });

        placeholderElements.forEach(el => {
            el.setAttribute('placeholder', el.getAttribute(currentLang === 'en' ? 'data-en' : 'data-fr'));
        });
    });

    // Modale Prestations
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-modal');
    const orderBtns = document.querySelectorAll('.btn-order-modal');
    const formCatalogue = document.getElementById('order-form');
    const productTextDisplay = document.getElementById('selected-product-text');
    let selectedProduct = '';
    
    orderBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedProduct = btn.getAttribute('data-product');
            productTextDisplay.textContent = selectedProduct;
            modal.style.display = 'flex';
        });
    });

    closeBtn.onclick = () => { modal.style.display = 'none'; };
    window.onclick = (e) => { if (e.target == modal) { modal.style.display = 'none'; } };

    formCatalogue.addEventListener('submit', (e) => {
        e.preventDefault();
        const prenom = document.getElementById('prenom').value;
        const nom = document.getElementById('nom').value;
        const numero = document.getElementById('numero').value;
        const dateRaw = document.getElementById('date-rdv').value;

        const dateObj = new Date(dateRaw);
        const dateFormatee = dateObj.toLocaleDateString('fr-FR') + " à " + dateObj.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});

        const message = `Bonjour Oce Lashes 🌸\n\nJe souhaite valider ma commande pour la pose : *${selectedProduct}*.\n\nVoici mes informations :\n- *Nom :* ${nom} ${prenom}\n- *Numéro :* ${numero}\n- *Date et heure souhaitées :* ${dateFormatee}\n\nMerci !`;

        window.open(`https://wa.me/${numWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
        formCatalogue.reset();
        modal.style.display = 'none';
    });

    // Formulaire Sur Mesure
    const customFileInput = document.getElementById('custom-file');
    const fileNameDisplay = document.getElementById('file-name');
    const customForm = document.getElementById('custom-order-form');

    customFileInput.addEventListener('change', function() {
        if (this.files && this.files.length > 0) {
            fileNameDisplay.textContent = "Photo sélectionnée : " + this.files[0].name;
            fileNameDisplay.style.color = "#333";
            fileNameDisplay.style.fontWeight = "bold";
        }
    });

    customForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('custom-desc').value;
        let message = `Bonjour Oce Lashes 🌸\n\nJe souhaite réaliser une pose sur mesure.\n\n*Ma description :*\n"${description}"\n\n`;
        
        if (customFileInput.files.length > 0) {
            message += `_(Je vous envoie la photo d'inspiration juste après ce message !)_`;
        } else {
            message += `_(Je n'ai pas de photo d'inspiration, je vous laisse me conseiller !)_`;
        }

        window.open(`https://wa.me/${numWhatsApp}?text=${encodeURIComponent(message)}`, '_blank');
        customForm.reset();
        fileNameDisplay.textContent = currentLang === 'en' ? "Click to add your photo" : "Cliquez pour ajouter votre photo";
        fileNameDisplay.style.color = "var(--pink-dark)";
        fileNameDisplay.style.fontWeight = "normal";
    });
});