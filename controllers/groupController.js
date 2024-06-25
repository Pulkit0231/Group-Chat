import Group from '../models/Group.js';

export async function createGroup(req, res) {
    const { name } = req.body;
    try {
        const group = new Group({ name, members: [req.user] });
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function joinGroup(req, res) {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ msg: 'Group not found' });

        if (group.members.includes(req.user)) {
            return res.status(400).json({ msg: 'Already a member' });
        }

        group.members.push(req.user);
        await group.save();
        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function leaveGroup(req, res) {
    const { groupId } = req.params;
    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ msg: 'Group not found' });

        group.members = group.members.filter(member => member.toString() !== req.user);
        await group.save();
        res.json({ msg: 'Left group' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
