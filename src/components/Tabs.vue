<script setup lang="ts">
import { Cog6ToothIcon } from '@heroicons/vue/24/solid';
import type { Tab } from './interfaces';
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
    },
});

defineEmits(['changeActiveTabEmitter']);
</script>

<template>
    <template v-if="tabs">
        <div class="px-5">
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