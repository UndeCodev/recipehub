<template>
    <div 
        class="select-image"
        :class="{ 'border-dashed' : !localImage }"
    >
        <img 
            v-if="localImage"
            :src="localImage" 
            alt="Imagen seleccionada" 
            class="select-image__image">
        <div class="d-grid justify-items-center">
            <i 
                v-if="!localImage"
                class="fa-solid fa-image text-primary icon-lg"
            ></i>
            <button 
                type="button" 
                class="btn btn--primary mt-md" 
                :class="{ 'btn-bottom-right' : localImage }"
                @click="$refs.selectorImage.click()"
            >
                <slot name="message">
                    <span v-if="!localImage">Selecciona imagen</span>
                    <i 
                        v-else
                        class="fa-regular fa-pen-to-square"
                    ></i>
                </slot>
            </button>      
        </div>  
    </div>

    <input type="file" @change="onSelectedImage" ref="selectorImage" v-show="false" accept="image/png, image/jpeg, image/jpg">
</template>

<script>
import { ref } from 'vue'

export default {
    emits: ['on:change'],
    setup(_, { emit }) { 
        const localImage = ref(),
              file = ref()
        
        const onSelectedImage = (event) => {
            const fileSelected = event.target.files[0]

            if(!fileSelected){
                localImage.value = null
                file.value = null

                emit('on:change', file.value)
                return
            }

            file.value = fileSelected
            emit('on:change', file.value)
            const fr = new FileReader()

            fr.onload = () => localImage.value = fr.result
            fr.readAsDataURL(file.value)
        }

        return {
            localImage,

            // Methods
            onSelectedImage
        }
    }
}
</script>

<style lang="scss" scoped>
@use '@/sass/components/icons';
@use '@/sass/components/button';

.select-image{
    height: 100%;
    display: grid;
    grid-template-areas: "image-container";
    place-items: center;
    position: relative;
    border-radius: 3px;
    overflow: hidden;

    & > *{
        grid-area: image-container;
    }

    &__image{
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        border-radius: 3px;
    }
}

.border-dashed{
    border: 2px dashed #adb5bd;
}

.btn-bottom-right{
    position: absolute;
    right: 1rem;
    bottom: 1rem;
}
</style>