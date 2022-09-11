<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/solid';
import { ref } from 'vue';
import type { Tab } from './interfaces';
import Notifications from './notifications/Notifications.vue';
defineProps({
    tabs: {
        type: Array as () => Tab[],
    },
    activeTab: {
        type: String
    },
});

defineEmits(['changeActiveTabEmitter']);

const allMessagesRead = ref(false);
const markAllAsRead = () => {
    allMessagesRead.value = allMessagesRead.value ? false : true;
}
</script>

<template>
    <template v-if="tabs">
        <div class="px-6 sticky top-0 z-50 bg-blend-saturation backdrop-blur-xl">
            <div class="flex items-center justify-between pt-5 pb-2">
                <h1 class="font-bold text-2xl">Notifications</h1>
                <p class="underline font-semibold hover:cursor-pointer" @click="markAllAsRead()">{{allMessagesRead ?
                "Mark all as unread" : 'Mark all as read'}}</p>
            </div>
            <div class="relative inline-flex flex-col items-center pt-3 w-full">
                <div class="flex items-center justify-between w-full">
                    <div v-if="tabs" class="flex items-center">
                        <div v-for="tab in tabs" class="flex items-center gap-x-1 transition ease-in-out px-3"
                            :class="tab.title === activeTab ? 'border-b-black border-b-4 py-2' : 'text-grey hover:cursor-pointer'"
                            @click="$emit('changeActiveTabEmitter',tab.title)">
                            <span class="font-bold">{{tab.title}}</span>
                            <span v-if="tab.data?.length" class="rounded-lg px-2 py-0.5 text-white font-semibold"
                                :class="tab.title === activeTab ? 'bg-black text-white' : 'bg-[#f2f3f3] text-gray-500'">
                                {{tab.data?.length}}</span>
                        </div>
                    </div>
                    <div>
                        <Cog6ToothIcon class="text-white stroke-grey h-6 w-6 hover:text-black hover:cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
        <Notifications :allMessagesRead="allMessagesRead"
            :sampleNotifications="tabs.find(tab => tab.title === activeTab)?.data" />
    </template>
</template>