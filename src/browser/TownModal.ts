import Modal from './Modal';
import Town from '../shared/Town';
import * as _ from 'lodash';

export class TownModal extends Modal<Town> {
    protected template = _.template(`
    <div class="center h2">Town #<%= id %></div>
    <div class="row">
        <div class="buildings  col-xs-6">
            <h3>Buildings</h3>
            <% buildings.forEach(building => { %>
                <div>building</div>
            <% }); %>
        </div>
        <div class="resources col-xs-6">
            <h3>Resources</h3>
            <div><label>Wood </label><span><%= resources.wood %></span></div>
            <div><label>Stone </label><span><%= resources.stone %></span></div>
            <div><label>Iron </label><span><%= resources.iron %></span></div>
        </div>    
    </div>
    `);
    
    constructor() {
        super('#town');
    }
}

export default TownModal;
