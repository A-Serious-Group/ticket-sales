<template>
  <div class="container">
    <h1 class="title">Criar Eventos</h1>

    <div class="form-container">
      <vs-input
        label="Nome do Evento"
        v-model="eventData.name"
        placeholder="Digite o nome do evento"
      />
      
      <vs-textarea
        label="Descrição"
        v-model="eventData.description"
        placeholder="Digite a descrição do evento"
      />
      
      <vs-input-number
        label="Limite de Ingressos"
        v-model="eventData.limit"
        :min="1"
        placeholder="Digite o número máximo de ingressos"
      />

      <label>Imagem do Evento</label>
      <input ref="fileInput" type="file" @change="manualUpload" accept="image/*" />
      
      <!-- Imagem de prévia -->
      <div v-if="imagePreview" class="image-preview-container">
        <img :src="imagePreview" alt="Prévia da imagem" class="image-preview" />
        <button @click="removeImage" class="remove-image-btn">x</button>
      </div>

      <vs-input
        label="Preço"
        v-model="eventData.price"
        placeholder="R$ 0,00"
        prepend="R$"
        type="number"
      />

      <vs-button @click="submitForm" class="submit-button">Criar</vs-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import event from '@/requests/event';

export default {
  name: 'CreateEvent',
  data: () => ({
    eventData: {
      name: '',
      description: '',
      limit: 1,
      image_url: '',
      price: 0,
    },
    imagePreview: null,
  }),

  methods: {
    async submitForm() {
      try {
        await event.create(this.eventData);
        this.$vs.notify({
          title: 'Sucesso',
          text: 'Evento criado com Sucesso!',
          color: 'sucess',
        })

        this.eventData = {
          name: '',
          description: '',
          limit: 1,
          image_url: '',
          price: 0,
        }
        this.removeImage();

      } catch (error) {
        console.error('Erro ao criar evento:', error);
      }
    },
    async manualUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.imagePreview = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(this.url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        this.eventData.image_url = response.data?.url ?? '';
        console.log('Upload feito com input manual:', response.data);
      } catch (error) {
        console.error('Erro no upload:', error.response?.data || error);
      }
    },
    removeImage() {
      this.imagePreview = null;
      this.eventData.image_url = ''; 
      this.$refs.fileInput.value = '';
    }
  },

  computed: {
    url() {
      return 'http://localhost:3000/upload';
    }
  },
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

.form-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.submit-button {
  margin-top: 20px;
  width: 100%;
}

.vs-input, .vs-textarea, .vs-input-number {
  width: 100%;
}

.image-preview-container {
  position: relative;
  display: inline-block;
  margin-top: 10px;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  object-fit: contain;
}

.remove-image-btn {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove-image-btn:hover {
  background: rgba(255, 0, 0, 1);
}
</style>
