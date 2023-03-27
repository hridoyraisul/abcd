<template>
  <div
      tabindex="-1"
      class="modal fade"
      aria-hidden="true"
      ref="bootstrap__modal"
      aria-labelledby="bs__modal"
  >
    <div
        class="modal-dialog"
        :class="[
        {
          'modal-dialog-scrollable': scrollable,
          'modal-dialog-centered': centered,
          'modal-fullscreen': fullscreen,
        },
        size ? `modal-${size}` : '',
        fullscreenBelow ? `modal-fullscreen-${fullscreenBelow}-down` : '',
      ]"
    >
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            <slot name="title">
              <h5 class="modal-title" id="bs__modal">
                {{ title }}
              </h5>
            </slot>
            <slot name="closeIcon">
              <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
              ></button>
            </slot>
          </slot>
        </div>

        <template v-if="form">
          <form @submit.prevent="formSubmit" v-bind="formAttrs">
            <div class="modal-body">
              <ol v-if="errors.length > 0">
                <li
                    v-for="(error, index) in errors"
                    class="text-danger"
                    :key="index"
                >
                  <small>{{ error }}</small>
                </li>
              </ol>
              <slot></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <slot name="close">
                  <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                  >
                    {{ closeText }}
                  </button>
                </slot>
                <slot name="submit">
                  <button
                      type="submit"
                      class="btn btn-primary"
                      :disabled="submitLoading"
                  >
                    <div
                        v-if="submitLoading"
                        class="spinner-border spinner-border-sm"
                    ></div>
                    <span>{{ submitText }}</span>
                  </button>
                </slot>
              </slot>
            </div>
          </form>
        </template>
        <template v-else>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <slot name="close">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                  {{ closeText }}
                </button>
              </slot>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
  name: "BSModal",
  props: {
    title: { type: String, default: "Modal Title" },
    submitText: { type: String, default: "Submit" },
    closeText: { type: String, default: "Close" },
    scrollable: { type: Boolean, default: false },
    centered: { type: Boolean, default: false },
    size: { type: String, default: "" }, // "xl", "lg", "sm"},
    fullscreen: { type: Boolean, default: false },
    fullscreenBelow: { type: String, default: "" }, // "sm", "md", "lg", "xl", "xxl"
    options: { type: Object, default: Object },
    form: { type: Boolean, default: true },
    formAttrs: { type: Object, default: Object },
    errors: { type: Array, default: new Array() },
    submitLoading: { type: Boolean, default: false },
  },
  data() {
    return {
      bsModal: null,
    };
  },
  mounted() {
    this.bsModal = this.createModal();

    if (this.$refs["bootstrap__modal"]) {
      const modal = this.$refs["bootstrap__modal"];
      modal.addEventListener("hidden.bs.modal", (event) => {
        this.$emit("close", event);
      });
    }
  },
  methods: {
    formSubmit(ev) {
      this.$emit("formSubmit", ev);
    },
    modal(method = null, ...args) {
      if (!this.bsModal) {
        throw new Error('[Modal Component]: "Instance creation failed."');
      }

      return this.bsModal[method](...args);
    },
    createModal() {
      const modal = this.$refs["bootstrap__modal"];
      return new Modal(modal, this.options);
    },
    getInstance() {
      return this.bsModal;
    },
  },
};
</script>

<style>
</style>
