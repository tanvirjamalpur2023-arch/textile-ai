"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FolderOpen,
  Plus,
  Trash2,
  StickyNote,
  Calendar,
  Tag,
} from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function MyResearchPage() {
  const { researchNotes, addNote, deleteNote } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteCategory, setNoteCategory] = useState("General");

  const handleAddNote = () => {
    if (!noteTitle.trim()) return;
    addNote({
      id: Date.now().toString(),
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      createdAt: new Date().toLocaleDateString(),
    });
    setNoteTitle("");
    setNoteContent("");
    setNoteCategory("General");
    setShowForm(false);
  };

  const categories = [
    "General",
    "Literature Review",
    "Experiment Plan",
    "Data Analysis",
    "Paper Draft",
    "Reference",
    "Idea",
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <FolderOpen size={20} className="text-orange-500" />
            My Research
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Organize your research notes, plans, and progress
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus size={14} />
          New Note
        </Button>
      </div>

      {/* Add Note Form */}
      {showForm && (
        <Card className="border-0 shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Note title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write your note content..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              rows={4}
            />
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Category:</span>
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={noteCategory === cat ? "default" : "secondary"}
                  className="cursor-pointer text-[10px]"
                  onClick={() => setNoteCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleAddNote}>
                Save Note
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Research Progress */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Research Progress Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { step: "Topic Selection", done: true },
              { step: "Literature Review", done: true },
              { step: "Experiment Design", done: false },
              { step: "Data Collection", done: false },
              { step: "Paper Writing", done: false },
              { step: "Journal Submission", done: false },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-center gap-3 text-sm"
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    item.done
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {item.done ? "✓" : <span className="text-[10px]">○</span>}
                </div>
                <span
                  className={
                    item.done
                      ? "text-slate-700 font-medium"
                      : "text-slate-400"
                  }
                >
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-3">
        {researchNotes.length === 0 ? (
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 text-center">
              <StickyNote
                size={40}
                className="mx-auto text-slate-300 mb-3"
              />
              <p className="text-sm text-slate-500">
                No notes yet. Click &quot;New Note&quot; to start organizing your
                research!
              </p>
            </CardContent>
          </Card>
        ) : (
          researchNotes.map((note) => (
            <Card key={note.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-800">
                        {note.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5"
                      >
                        <Tag size={8} className="mr-1" />
                        {note.category}
                      </Badge>
                    </div>
                    {note.content && (
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {note.content}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar size={10} className="text-slate-400" />
                      <span className="text-[10px] text-slate-400">
                        {note.createdAt}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-500"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
