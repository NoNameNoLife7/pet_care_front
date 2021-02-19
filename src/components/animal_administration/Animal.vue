<template>
  <div class="layout-content ">
    <Toast/>
    <Panel header="Animals CRUD">
      <div class="card">
        <Panel>
          <Toolbar class="p-mb-4">
            <template #left>
              <Button label="New" icon="pi pi-plus" class="p-button-success p-mr-2" @click="openNew" />
              <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedAnimals || !selectedAnimals.length" />
            </template>

            <template #right>
              <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="p-mr-2 p-d-inline-block" />
              <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
          </Toolbar>
        </Panel>
        <Panel>
          <DataTable :value="animals" v-model:selection="selectedAnimals" dataKey="id"
                     :paginator="true" :rows="10" :filters="filters"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
                     currentPageReportTemplate="Showing {first} to {last} of {totalRecords} animals">
            <template #header>
              <div class="table-header">
                <h5 class="p-m-0">Manage animals</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global']" placeholder="Search..." />
                </span>
              </div>
            </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem" :exportable="false"></Column>
            <Column field="name" header="Name" :sortable="true"></Column>
            <Column field="age" header="Age" :sortable="true"></Column>
            <Column field="gender" header="Gender" :sortable="true"></Column>
            <Column header="Image">
              <template #body="slotProps">
                <img :src="animal.profilePicture + slotProps.data.image" :alt="slotProps.data.image" class="animal-image" />
              </template>
            </Column>
            <Column :exportable="false">
              <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="editAnimal(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteAnimal(slotProps.data)" />
              </template>
            </Column>
          </DataTable>
        </Panel>
      </div>
    </Panel>

    <Dialog v-model:visible="animalDialog" :style="{width: '450px'}" header="Add an Animal" :modal="true" class="p-fluid">
        <span class="p-float-label">
          <InputText id="name" type="text" v-model="animal.name" />
          <label for="name">Name</label>
        </span>
      <br/>
      <span class="p-float-label">
          <InputText id="age" type="number" v-model="animal.age" />
          <label for="age">Age</label>
        </span>
      <br/>
      <span class="p-float-label">
          <InputText id="gender" type="text" v-model="animal.gender" />
          <label for="gender">Gender</label>
        </span>
      <!--      <img :src="'demo/images/animal/' + animal.image" :alt="animal.image" class="animal-image" v-if="animal.image" />-->
      <!--      <div class="p-field">
              <label for="name">Name</label>
              <InputText id="name" v-model.trim="animal.name" required="true" autofocus :class="{'p-invalid': submitted && !animal.name}" />
              <small class="p-error" v-if="submitted && !animal.name">Name is required.</small>
            </div>-->

      <!--      <Dropdown id="inventoryStatus" v-model="animal.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status">
              <template #value="slotProps">
                <div v-if="slotProps.value && slotProps.value.value">
                  <span :class="'animal-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
                </div>
                <div v-else-if="slotProps.value && !slotProps.value.value">
                  <span :class="'animal-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
                </div>
                <span v-else>
              {{slotProps.placeholder}}
            </span>
              </template>
            </Dropdown>-->

      <!--      <div class="p-field">
              <label class="p-mb-3">Category</label>
              <div class="p-formgrid p-grid">
                <div class="p-field-radiobutton p-col-6">
                  <RadioButton id="category1" name="category" value="Accessories" v-model="animal.category" />
                  <label for="category1">Accessories</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                  <RadioButton id="category2" name="category" value="Clothing" v-model="animal.category" />
                  <label for="category2">Clothing</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                  <RadioButton id="category3" name="category" value="Electronics" v-model="animal.category" />
                  <label for="category3">Electronics</label>
                </div>
                <div class="p-field-radiobutton p-col-6">
                  <RadioButton id="category4" name="category" value="Fitness" v-model="animal.category" />
                  <label for="category4">Fitness</label>
                </div>
              </div>
            </div>-->

      <!--      <div class="p-formgrid p-grid">
              <div class="p-field p-col">
                <label for="age">Quantity</label>
                <InputNumber id="age" v-model="animal.age" integeronly />
              </div>
            </div>-->
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveAnimal" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteAnimalDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="animal">Are you sure you want to delete <b>{{animal.name}}</b>?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAnimalDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteAnimal" />
      </template>
    </Dialog>

    <Dialog v-model:visible="deleteAnimalsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="animal">Are you sure you want to delete the selected animals?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteAnimalsDialog = false"/>
        <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedAnimals" />
      </template>
    </Dialog>
  </div>
</template>

<script>
import AnimalService from "@/components/service/AnimalService";
export default {
  name: "Animal",
  data() {
    return {
      animals: null,
      animalDialog: false,
      deleteAnimalDialog: false,
      deleteAnimalsDialog: false,
      animal: {
        name : null,
        age : null,
        gender : null,
        healthStatus : null,
        breed : null,
        profilePicture : null
      },
      selectedAnimals: null,
      filters: {},
      submitted: false
    }
  },
  animalService: null,
  created() {
    this.animalService = new AnimalService();
  },
  mounted() {
    this.getAll();
  },
  methods: {
    openNew() {
      this.animal = {};
      this.submitted = false;
      this.animalDialog = true;
    },
    hideDialog() {
      this.animalDialog = false;
      this.submitted = false;
    },
    getAll() {
      this.animalService.getAll().then(data => {
        this.animals = data.data;
      });
      console.log(this.animals);
    },
    saveAnimal() {
      this.submitted = true;
      this.animalService.save(this.animal).then(data => {
        if (data.status === 200) {
          this.$toast.add({severity: 'success', summary: 'Success Message', detail: 'Animal Saved!', life: 3000});
          this.animal = {
            id : null,
            name: null,
            age: null,
            gender: null,
            healthStatus: null,
            breed: null,
            profilePicture: null
          }
          this.getAll();
          this.animalDialog = false;
        } else {
          this.$toast.add({severity: 'errormessage', summary: 'Error', detail: 'Animal NOT Saved!', life: 3000});
        }
      });
    },
    editAnimal(animal) {
      this.animal = {...animal};
      this.animalDialog = true;
    },
    confirmDeleteAnimal(animal) {
      this.animal = animal;
      this.deleteAnimalDialog = true;
    },
    deleteAnimal() {
      this.animals = this.animals.filter(val => val.id !== this.animal.id);
      this.animalService.delete(this.animal.id).then(data => {
        if(data.status === 200) {
          this.$toast.add({severity:'success', summary: 'Successfully deleted', detail: 'Animal Deleted', life: 3000});
          this.animal = {
            id : null,
            name : null,
            age : null,
            gender : null,
            healthStatus : null,
            breed : null,
            profilePicture : null
          };
          this.getAll();
        } else {
          this.$toast.add({severity:'error', summary: 'Error', detail: 'Animal NOT Deleted!', life: 3000});
        }
      });
      this.deleteAnimalDialog = false;
    },
    findIndexById(id) {
      let index = -1;
      for (let i = 0; i < this.animals.length; i++) {
        if (this.animals[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteAnimalsDialog = true;
    },
    deleteAnimalSelection(item) {
      this.animalService.delete(item.id);
    },
    deleteSelectedAnimals() {
      this.animals = this.animals.filter(val => !this.selectedAnimals.includes(val));
      this.animals.forEach(deleteAll);
      function deleteAll(item) {
        this.animal = {
          id : item.id
        }
        this.deleteAnimal();
      }
      this.deleteAnimalsDialog = false;
      this.selectedAnimals = null;
      this.$toast.add({severity:'success', summary: 'Successful', detail: 'Animals Deleted', life: 3000});
    }
  }
}
</script>

<style >

</style>
