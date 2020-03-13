<template>
    <div class="wrapper row">
        <span class="title">
            CIPS Repository
        </span>
        <div class="menu-items">
            <b-dropdown variant="outline-default" id="dropdown-1" text="Content" class="m-md-2 dropdown">
                <b-dropdown-item>First item</b-dropdown-item>
                <b-dropdown-item>Second item</b-dropdown-item>
            </b-dropdown>

            <b-dropdown variant="outline-default" id="dropdown-1" text="About" class="m-md-2 dropdown">
                <b-dropdown-item>First item</b-dropdown-item>
                <b-dropdown-item>Second item</b-dropdown-item>
            </b-dropdown>

            <span>
                <a href="#" style="color: black; text-decoration: none">Contact</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BarStrip'
}
</script>

<style lang="scss">
    .wrapper {
        background-color: transparent;
        box-shadow: 0 1px 2px 0 rgba(32,32,32, 0.4);
        padding-left: 25px;
        justify-content: flex-start;
        align-items: center;
    }

    .wrapper .title {
        font-size: 28px;
        color: red;
        font-weight: 500;
        margin-left: 50px;
        margin-bottom: 5px;
    }
    .menu-items {
        align-items: baseline;
        padding-left: 3px;
        padding-right: 3px;
    }
    .menu-items * {
        text-align: center;
        align-self: center;
        font-weight: 500;
    }
    * .dropdown {
        bottom: 1px;
    }
</style>