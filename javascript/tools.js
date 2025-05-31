
    const tools = [
       {
    title: 'Empathy Map',
    image: 'images/tools/empathy_mapping.jpg',
    tags: ['Empathy'],
    description: 'Understand and articulate what a user experiences.',
    details: 'An Empathy Map is a simple, powerful tool used in design thinking and user-centered design. It captures insights about user behavior, emotions, and motivations. Typically divided into Think & Feel, Hear, See, Say & Do, Pains, and Gains, it’s widely used early in product development.'
  },
  {
    title: 'Affinity Diagramming',
    image: 'images/tools/affinity_diagram.jpg',
    tags: ['Planning'],
    description: 'Group ideas into clusters to find patterns.',
    details: 'Affinity diagramming helps organize ideas, data, and insights by grouping them into meaningful categories or clusters. It’s used to uncover relationships between concepts and is especially useful during brainstorming or synthesis phases.'
  },
  {
    title: '5 Whys',
    image: 'images/tools/affinity_diagram.jpg',
    tags: ['Planning'],
    description: 'Group ideas into clusters to find patterns.',
    details: 'Affinity diagramming helps organize ideas, data, and insights by grouping them into meaningful categories or clusters. It’s used to uncover relationships between concepts and is especially useful during brainstorming or synthesis phases.'
  },
    ];

    const grid = document.getElementById('toolGrid');

    function renderCards(filter = 'All') {
  grid.innerHTML = '';
  tools.forEach(tool => {
    if (filter === 'All' || tool.tags.includes(filter)) {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${tool.image}" alt="${tool.title}" />
        <h3>${tool.title}</h3>
        <p>${tool.description}</p>
        <div class="tags">${tool.tags.map(tag => `<span>${tag}</span>`).join(' ')}</div>
        <div class="note-section">
          <textarea placeholder="Take notes..."></textarea>
          <button onclick="exportNote(this, '${tool.title}')">Export Note</button>
        </div>
      `;
      card.addEventListener('click', () => showModal(tool));
      grid.appendChild(card);
    }
  });
}


    function filterCards(tag) {
      renderCards(tag);
    }

    function showModal(tool) {
  document.getElementById('modalImage').src = tool.image;
  document.getElementById('modalTitle').innerText = tool.title;
  document.getElementById('modalDescription').innerText = tool.details || tool.description;
  document.getElementById('modalTags').innerHTML = tool.tags.map(tag => `<span>${tag}</span>`).join(' ');
  document.getElementById('toolModal').style.display = 'block';
}


document.querySelector('.close-button').onclick = () => {
  document.getElementById('toolModal').style.display = 'none';
};

window.onclick = (event) => {
  if (event.target === document.getElementById('toolModal')) {
    document.getElementById('toolModal').style.display = 'none';
  }
};


    function exportNote(button, title) {
      const text = button.previousElementSibling.value;
      const blob = new Blob([text], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${title.replace(/\s+/g, '_')}_notes.txt`;
      a.click();
    }

    renderCards();
