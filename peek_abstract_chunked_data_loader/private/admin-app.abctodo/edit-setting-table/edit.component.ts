import {Component} from "@angular/core";
import {Ng2BalloonMsgService} from "@synerty/ng2-balloon-msg";
import {
    ComponentLifecycleEventEmitter,
    extend,
    TupleLoader,
    VortexService
} from "@synerty/vortexjs";
import {abstracDataLoaderFilt} from "../PluginNames";
import {SettingPropertyTuple} from "../tuples/SettingPropertyTuple";


@Component({
    selector: 'pl-pof-diagram-loader-edit-setting',
    templateUrl: './edit.component.html'
})
export class EditSettingComponent extends ComponentLifecycleEventEmitter {
    // This must match the dict defined in the admin_backend handler
    private readonly filt = {
        "key": "admin.Edit.SettingProperty"
    };

    items: SettingPropertyTuple[] = [];

    loader: TupleLoader;

    constructor(private balloonMsg: Ng2BalloonMsgService,
                vortexService: VortexService) {
        super();

        this.loader = vortexService.createTupleLoader(this,
            () => extend({}, this.filt, abstracDataLoaderFilt));

        this.loader.observable
            .subscribe((tuples:SettingPropertyTuple[]) => this.items = tuples);
    }

    saveClicked() {
        this.loader.save()
            .then(() => this.balloonMsg.showSuccess("Save Successful"))
            .catch(e => this.balloonMsg.showError(e));
    }

    resetClicked() {
        this.loader.load()
            .then(() => this.balloonMsg.showSuccess("Reset Successful"))
            .catch(e => this.balloonMsg.showError(e));
    }

}