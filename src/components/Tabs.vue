<script setup lang="ts">
import type { Tab } from '@/views/NotificationView.vue';
import { Cog6ToothIcon } from '@heroicons/vue/24/solid';
import Notifications from './notifications/Notifications.vue';
defineProps({
    tabs: {
        type: Array as () => Tab[],
    },
    activeTab: {
        type: String
    },
    allMessagesRead: {
        type: Boolean
    }
});
defineEmits(['changeActiveTabEmitter']);
</script>

<template>
    <div class="px-5">
        <div class="relative inline-flex flex-col items-center pt-3 w-full">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                    <div v-for="tab in tabs" class="flex items-center gap-x-1 transition-all ease-linear px-3"
                        :class="tab.title === activeTab ? 'border-b-black border-b-4 py-2' : 'text-grey hover:cursor-pointer'"
                        @click="$emit('changeActiveTabEmitter',tab.title)">
                        <span class="font-bold">{{tab.title}}</span>
                        <span v-if="tab.count" class="rounded-lg px-2 py-0.5 text-white font-semibold"
                            :class="tab.title === activeTab ? 'bg-black text-white' : 'bg-[#f2f3f3] text-gray-500'">
                            {{tab.count}}</span>
                    </div>
                </div>
                <div>
                    <Cog6ToothIcon class="text-white stroke-grey h-6 w-6 hover:text-black hover:cursor-pointer" />
                </div>
            </div>

        </div>
    </div>
    <template class="" v-if="activeTab === 'All'">
        <Notifications :allMessagesRead="allMessagesRead" />
    </template>
</template>