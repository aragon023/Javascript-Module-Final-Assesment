const clustersContainer = document.getElementById('clustersContainer');
let data = JSON.parse(localStorage.getItem('affinityData')) || [];

function saveData() {
  localStorage.setItem('affinityData', JSON.stringify(data));
}

function render() {
  clustersContainer.innerHTML = '';
  data.forEach((cluster, cIdx) => {
    const clusterDiv = document.createElement('div');
    clusterDiv.className = 'cluster';
    clusterDiv.setAttribute('draggable', 'true');
    clusterDiv.dataset.index = cIdx;

    const header = document.createElement('div');
    header.className = 'cluster-header';

    const title = document.createElement('input');
    title.value = cluster.title;
    title.oninput = e => {
      data[cIdx].title = e.target.value;
      saveData();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-cluster';
    deleteBtn.textContent = '✕';
    deleteBtn.onclick = () => {
      data.splice(cIdx, 1);
      saveData();
      render();
    };

    header.appendChild(title);
    header.appendChild(deleteBtn);
    clusterDiv.appendChild(header);

    cluster.notes.forEach((note, nIdx) => {
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.style.background = note.color;
      noteDiv.setAttribute('draggable', 'true');

      const textarea = document.createElement('textarea');
      textarea.value = note.text;
      textarea.rows = 3;
      textarea.oninput = e => {
        data[cIdx].notes[nIdx].text = e.target.value;
        saveData();
      };

      const deleteNoteBtn = document.createElement('button');
      deleteNoteBtn.className = 'delete-note';
      deleteNoteBtn.textContent = '✕';
      deleteNoteBtn.onclick = e => {
        e.stopPropagation();
        data[cIdx].notes.splice(nIdx, 1);
        saveData();
        render();
      };

      noteDiv.appendChild(textarea);
      noteDiv.appendChild(deleteNoteBtn);
      noteDiv.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ cIdx, nIdx }));
      });

      clusterDiv.appendChild(noteDiv);
    });

    clusterDiv.addEventListener('dragover', e => e.preventDefault());
    clusterDiv.addEventListener('drop', e => {
      const { cIdx: fromC, nIdx: fromN } = JSON.parse(e.dataTransfer.getData('text/plain'));
      const [movedNote] = data[fromC].notes.splice(fromN, 1);
      data[cIdx].notes.push(movedNote);
      saveData();
      render();
    });

    clusterDiv.addEventListener('dragstart', e => {
      e.dataTransfer.setData('cluster-index', cIdx);
    });

    clusterDiv.addEventListener('drop', e => {
      const fromIdx = e.dataTransfer.getData('cluster-index');
      if (fromIdx && fromIdx !== cIdx) {
        const moved = data.splice(fromIdx, 1)[0];
        data.splice(cIdx, 0, moved);
        saveData();
        render();
      }
    });

    clustersContainer.appendChild(clusterDiv);
  });
}

function createCluster() {
  data.push({ title: 'Untitled Cluster', notes: [] });
  saveData();
  render();
}

function createNote() {
  if (data.length === 0) {
    createCluster();
  }
  const color = document.getElementById('noteColorPicker').value;
  data[0].notes.push({ text: '', color });
  saveData();
  render();
}

function clearSaved() {
  localStorage.removeItem('affinityData');
  data = [];
  render();
}

render();
